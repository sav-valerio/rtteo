const imap = require("imap");
const mailParser = require("mailparser").simpleParser;

class Rtteo {
  constructor(config, callback, mailer = null, parser = null) {
    this.config = config;
    this.callback = callback;
    this.mailer = mailer || imap;
    this.parser = parser || mailParser;
    this.inbox = null;
    this.latest_email = null;
  }

  /**
   * Connects to the mailbox via IMAP.
   */
  connect() {
    this.inbox = this.mailer({
      user: this.config.email,
      password: this.config.password,
      host: "imap.gmail.com",
      port: 993,
      tls: true
    });

    this.inbox.once("ready", this._openInbox.bind(this));
    this.inbox.on("mail", this._openInbox.bind(this));
    this.inbox.once("error", this._onError);
    this.inbox.connect();
  }

  _openInbox() {
    this.inbox.openBox("INBOX", true, (err, _) => {
      if (err) return this._onError(err);

      const buffer = this.inbox.seq.fetch("*:*", {
        bodies: "",
        markSeen: true,
        struct: true
      });

      buffer.on("message", this._onMessage.bind(this));
    });
  }

  _onMessage(message, seqno) {
    if (this.latest_email === seqno) {
      return;
    }
    this.latest_email = seqno;

    message.on("body", (stream, info) => {
      let body = "";

      stream.on("data", chunk => {
        body += chunk.toString("utf8");
      });

      stream.once("end", () => {
        this.parser(body)
          .then(email => {
            // if no subjects are defined, just execute the callback
            if (!("subject" in this.config)) {
              return this.callback(email, key);
            }

            return this._analyseSubject(email);
          })
          .catch(err => this._onError(err));
      });
    });
  }

  _analyseSubject(email) {
    Object.keys(this.config.subjects).forEach(key => {
      const regex = this.config.subjects[key];
      const matches = email.subject.match(regex);

      if (matches) {
        return this.callback(email, key, matches);
      }
    });
  }

  _onError(err) {
    console.log("Unable to connect to the mailbox:");
    console.log(err);
  }
}

module.exports = { Rtteo };
