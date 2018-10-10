# rtteo

A Node library which listens to your mailbox and it triggers a callback when certain subjects are matched.

## Usage

```js
const { Rtteo } = require('rtteo')

// An email with a subject like 'Alarm from: ets XYZ Corp' will result in:
// Type: alarm, Company: XYZ Corp.
const rtteo = new Rtteo({
  email: 'john.doe@example.com',
  password: 'password',
  subjects: {
    alarm: new RegExp('Alarm from: ets (.*)'),
    info: new RegExp('Info from: ets (.*)'),
    warning: new RegExp('Warning from: ets (.*)')
  }
}, (email, type, matches) => {
  const dest = matches[1]
  console.log(`Type: ${type}, To: ${dest}`)
})

rtteo.connect()
```

## License

**rtteo** is released under [GNU/GPL v3](LICENSE).