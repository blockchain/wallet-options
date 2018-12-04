const { Validator } = require('jsonschema')
const { v3, v4 } = require('./schema')

exports.validate = (json, version) => {
  const versions = { 'v3': v3, 'v4': v4 }
  return new Validator().validate(json, versions[version])
}
