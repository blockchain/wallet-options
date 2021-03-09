const fs = require('fs')
const path = require('path')
const { validate } = require('../src')

const runTestFor = (env, version) => {
  describe(env, () => {
    const files = {
      v3: 'wallet-options.json'
      // v4: 'wallet-options-v4.json'
    }
    const optionsPath = path.resolve(__dirname, '..', env, files[version])
    const options = fs.readFileSync(optionsPath).toString().trim()

    it('should be valid', () => {
      const result = validate(JSON.parse(options), version)
      const errors = result.errors.map(e => e.stack)
      expect(errors).toEqual([])
    })

    it('should be formatted properly', () => {
      const formatted = JSON.stringify(JSON.parse(options), null, 2)
      expect(formatted).toEqual(options)
    })
  })
}

describe('wallet-options', () => {
  runTestFor('prod', 'v3')
  runTestFor('staging', 'v3')
  runTestFor('dev', 'v3')
  runTestFor('testnet', 'v3')
})

// describe('wallet-options-v4', () => {
//   runTestFor('prod', 'v4')
//   runTestFor('staging', 'v4')
//   runTestFor('dev', 'v4')
//   runTestFor('testnet', 'v4')
// })
