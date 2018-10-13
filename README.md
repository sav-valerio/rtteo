# rtteo

A very minimal and lightweight mail listener written in Node.

## Usage

```js
const { Rtteo } = require('rtteo')

// An email with a subject like 'Alarm from: ets XYZ Corp' will result in:
// Type: alarm, Company: XYZ Corp.
const rtteo = new Rtteo({
  // You can define whatever mail provider you like editing the config/default.json file
  provider: 'gmail',
  email: 'john.doe@gmail.com',
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
