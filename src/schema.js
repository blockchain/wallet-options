const { object, string, bool, either, nullable, arrayOf, enumOf, just, country, state, integer, fraction } = require('./types')

module.exports = object({
  domains: object({
    root: string(),
    webSocket: string(),
    api: string(),
    walletHelperUrl: string()
  }),
  network: enumOf(['bitcoin', 'testnet']),
  showBuySellTab: arrayOf(country()),
  partners: object({
    coinify: object({
      countries: arrayOf(country()),
      partnerId: integer(),
      iSignThisDomain: string(),
      surveyLinks: arrayOf(nullable(string())),
      sellSurveyLinks: arrayOf(string()),
      showSellFraction: fraction()
    }),
    sfox: object({
      production: bool(),
      countries: arrayOf(country()),
      states: arrayOf(state()),
      inviteFormFraction: fraction(),
      showCheckoutFraction: fraction(),
      apiKey: string(),
      plaid: string(),
      plaidEnv: string(),
      siftScience: string(),
      surveyLinks: arrayOf(nullable(string()))
    }),
    unocoin: object({
      countries: arrayOf(country()),
      showCheckoutFraction: fraction(),
      production: bool(),
      surveyLinks: arrayOf(nullable(string())),
      surveyTradeLinks: arrayOf(nullable(string()))
    })
  }),
  service_charge: object({}),
  showMobileLogin: bool(),
  ethereum: object({
    countries: either(just('*'), arrayOf(country())),
    rolloutFraction: fraction(),
    surveyLinks: arrayOf(nullable(string()))
  }),
  shapeshift: object({
    apiKey: string(),
    countriesBlacklist: arrayOf(country()),
    statesWhitelist: arrayOf(state()),
    rolloutFraction: fraction(),
    upperLimit: integer(),
    surveyLinks: arrayOf(nullable(string()))
  }),
  bcash: object({
    feePerByte: integer()
  }),
  iosBuyPercent: fraction(),
  androidBuyPercent: fraction(),
  android: object({
    showUnocoin: bool()
  })
})
