const { Rtteo } = require('./../src/rtteo')

Rtteo({
  timeout: 2,
  accounts: [
    { email: 'john.doe@example.com', password: 'example' }
  ],
  objects: {
    alarm: new RegExp('Alarm from: ets (.*)'),
    info: new RegExp('Info from: ets (.*)'),
    warning: new RegExp('Warning from: ets (.*)')
  }
}).then((mailbox, object) => {
  console.log([mailbox, object])
}).catch(err => {
  console.log(err)
  process.exit(1)
})
