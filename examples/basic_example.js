const { Rtteo } = require('./../index')

const rtteo = new Rtteo({
  provider: 'outlook',
  email: 'john.doe@hotmail.com',
  password: 'password',
  subjects: {
    alarm: new RegExp('Alarm from: ets (.*)'),
    info: new RegExp('Info from: ets (.*)'),
    warning: new RegExp('Warning from: ets (.*)')
  }
}, (email, type, matches) => {
  const dest = matches[1]
  console.log(`Type: ${type}, To: ${dest}, Body: ${email.text}`)
})

rtteo.connect()
