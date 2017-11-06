const { Validator } = require('jsonschema')
const schema = require('./schema')

exports.validate = (json) => {
  return new Validator().validate(json, schema)
}
