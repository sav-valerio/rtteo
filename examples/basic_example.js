const { Rtteo } = require('./../index')

const rtteo = new Rtteo({
  email: 'john.doe@example.com',
  password: 'example',
  subjects: {
    alarm: new RegExp('Alarm from: ets (.*)'),
    info: new RegExp('Info from: ets (.*)'),
    warning: new RegExp('Warning from: ets (.*)')
  }
}, (type, matches) => {
  const dest = matches[1]
  console.log(`Type: ${type}, To: ${dest}`)
})

rtteo.connect()
