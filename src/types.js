const { countries, states } = require('./data')

exports.object = (properties) => ({ type: 'object', required: true, properties, additionalProperties: false })

exports.string = () => ({ type: 'string', required: true })

exports.number = () => ({ type: 'number', required: true })

exports.bool = () => ({ type: 'boolean', required: true })

exports.either = (a, b) => ({ oneOf: [a, b] })

exports.nullable = (type) => exports.either(type, { type: 'null' })

exports.optional = (type) => Object.assign(type, { required: false })

exports.arrayOf = (items) => ({ type: 'array', items })

exports.enumOf = (options) => ({ enum: options })

exports.just = (val) => exports.enumOf([val])

exports.country = () => exports.enumOf(countries)

exports.state = () => exports.enumOf(states)

exports.integer = () => Object.assign(exports.number(), { divisibleBy: 1 })

exports.fraction = () => Object.assign(exports.number(), { minimum: 0, maximum: 1 })

exports.localizedMessage = () => ({ type: 'object', properties: { 'en': exports.string() } })
