const { countries, states, supportedCoins } = require('./data')

exports.bool = () => ({ type: 'boolean', required: true })

exports.coin = () => exports.enumOf(supportedCoins)

exports.country = () => exports.enumOf(countries)

exports.object = (properties) => ({ type: 'object', required: true, properties, additionalProperties: false })

exports.string = () => ({ type: 'string', required: true })

exports.number = () => ({ type: 'number', required: true })

exports.either = (a, b) => ({ oneOf: [a, b] })

exports.nullable = (type) => exports.either(type, { type: 'null' })

exports.optional = (type) => Object.assign(type, { required: false })

exports.arrayOf = (items) => ({ type: 'array', items })

exports.enumOf = (options) => ({ enum: options })

exports.just = (val) => exports.enumOf([val])

exports.state = () => exports.enumOf(states)

exports.integer = () => Object.assign(exports.number(), { divisibleBy: 1 })

exports.fraction = () => Object.assign(exports.number(), { minimum: 0, maximum: 1 })

exports.localizedMessage = () => ({ type: 'object', required: true, properties: { 'en': exports.string() } })

exports.webServiceAlert = () => exports.object({
  action: exports.optional(exports.object({
    title: exports.optional(exports.localizedMessage()),
    link: exports.optional(exports.string())
  })),
  coins: exports.optional(exports.arrayOf(exports.enumOf(supportedCoins))),
  hideType: exports.optional(exports.enumOf(['collapse', 'dismiss'])),
  header: exports.optional(exports.localizedMessage()),
  icon: exports.optional(exports.string()),
  id: exports.optional(exports.string()),
  sections: exports.arrayOf(exports.object({
    title: exports.optional(exports.localizedMessage()),
    body: exports.localizedMessage()
  })),
  type: exports.enumOf(['info', 'warning', 'danger'])
})

exports.coin = () => exports.object({
  airdrop: exports.optional(exports.object({
    link: exports.optional(exports.string()),
    image: exports.optional(exports.string())
  })),
  availability: {
    send: exports.bool(),
    request: exports.bool(),
    lockbox: exports.bool(),
    exchangeTo: exports.bool(),
    exchangeFrom: exports.bool()
  },
  campaign: exports.optional(exports.string()),
  coinCode: exports.string(),
  coinTicker: exports.string(),
  colorCode: exports.string(),
  config: exports.optional(exports.object({
    network: exports.optional(exports.enumOf(['bitcoin', 'public', 'testnet', 1])),
    fees: exports.optional(exports.object({
      regular: exports.optional(exports.number()),
      priority: exports.optional(exports.number())
    })),
    sendTimeOutSeconds: exports.optional(exports.number())
  })),
  contractAddress: exports.optional(exports.string()),
  displayName: exports.string(),
  exchangeAddresses: exports.optional(exports.arrayOf(exports.string())),
  hasLockboxSupport: exports.bool(),
  icons: {
    default: exports.string(),
    circle: exports.string(),
    circleFilled: exports.string()
  },
  lastTxFuse: exports.optional(exports.enumOf([86400, 600])),
  learnMoreLink: exports.optional(exports.string()),
  minConfirmations: exports.number(),
  showNewTagSidenav: exports.optional(exports.bool()),
  txExplorerBaseUrl: exports.string(),
  txListAppRoute: exports.optional(exports.string())
})
