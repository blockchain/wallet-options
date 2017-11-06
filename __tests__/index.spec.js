const { validate } = require('../src')

let runTestFor = (env) => {
  describe(env, () => {
    let options = require(`../${env}/wallet-options.json`)
    it('should be valid', () => {
      let result = validate(options)
      let errors = result.errors.map(e => e.stack)
      expect(errors).toEqual([])
    })
  })
}

describe('wallet-options', () => {
  runTestFor('prod')
  runTestFor('staging')
  runTestFor('dev')
})
