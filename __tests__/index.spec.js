const fs = require('fs')
const path = require('path')
const { validate } = require('../src')

let runTestFor = (env) => {
  describe(env, () => {
    let optionsPath = path.resolve(__dirname, '..', env, 'wallet-options.json')
    let options = fs.readFileSync(optionsPath).toString().trim()

    it('should be valid', () => {
      let result = validate(JSON.parse(options))
      let errors = result.errors.map(e => e.stack)
      expect(errors).toEqual([])
    })

    it('should be formatted properly', () => {
      let formatted = JSON.stringify(JSON.parse(options), null, 2)
      expect(formatted).toEqual(options)
    })
  })
}

describe('wallet-options', () => {
  runTestFor('prod')
  runTestFor('staging')
  runTestFor('dev')
})
