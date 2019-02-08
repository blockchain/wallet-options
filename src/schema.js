const { object, string, bool, either, number, nullable, optional, arrayOf, enumOf, just, country, state, integer, fraction, localizedMessage, webServiceAlert } = require('./types')

const v3 = object({
  enableDomainMigrationRedirects: bool(),
  domains: object({
    root: string(),
    comRoot: nullable(string()),
    comWalletApp: nullable(string()),
    webSocket: string(),
    api: string(),
    walletHelperUrl: string()
  }),
  network: enumOf(['bitcoin', 'testnet']),
  showBuySellTab: arrayOf(country()),
  partners: object({
    coinify: object({
      disabled: bool(),
      disabledReason: optional(localizedMessage()),
      countries: arrayOf(country()),
      partnerId: integer(),
      iSignThisDomain: string(),
      surveyLinks: arrayOf(nullable(string())),
      sellSurveyLinks: arrayOf(string()),
      showSellFraction: fraction(),
      showRecurringBuy: bool()
    }),
    sfox: object({
      disabled: bool(),
      disabledReason: optional(localizedMessage()),
      production: bool(),
      countries: arrayOf(country()),
      states: arrayOf(state()),
      showBuyFraction: fraction(),
      inviteFormFraction: fraction(),
      showCheckoutFraction: fraction(),
      apiKey: string(),
      plaid: string(),
      plaidEnv: string(),
      siftScience: string(),
      surveyLinks: arrayOf(nullable(string())),
      buySurveyLinks: arrayOf(nullable(string()))
    }),
    unocoin: object({
      disabled: bool(),
      disabledReason: optional(localizedMessage()),
      countries: arrayOf(country()),
      showCheckoutFraction: fraction(),
      production: bool(),
      surveyLinks: arrayOf(nullable(string())),
      surveyTradeLinks: arrayOf(nullable(string()))
    })
  }),
  service_charge: object({}),
  showMobileLogin: bool(),
  buySell: object({
    disabled: bool(),
    disabledReason: optional(localizedMessage())
  }),
  ethereum: object({
    mew: bool(),
    countries: either(just('*'), arrayOf(country())),
    lastTxFuse: number(),
    rolloutFraction: fraction(),
    surveyLinks: arrayOf(nullable(string()))
  }),
  shapeshift: object({
    disabled: bool(),
    disabledReason: optional(localizedMessage()),
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
  web: object({
    serviceAlert: object({
      public: optional(webServiceAlert()),
      global: optional(webServiceAlert()),
      sendBtc: optional(webServiceAlert()),
      sendBtcBanner: optional(webServiceAlert()),
      requestBtc: optional(webServiceAlert()),
      requestBtcBanner: optional(webServiceAlert())
    })
  }),
  mobile: object({
    walletRoot: string()
  }),
  android: object({
    showUnocoin: bool(),
    showShapeshift: bool(),
    showSfox: bool()
  }),
  ios: object({
    showShapeshift: bool(),
    showSfox: bool()
  }),
  mobile_notice: optional(localizedMessage()),
  mobileInfo: optional(localizedMessage()),
  webHardFork: object({}),
  maintenance: bool()
})

const v4 = object({
  platforms: object({
    web: object({
      application: object({
        analyticsSiteId: number(),
        enableDomainMigrationRedirects: bool(),
        announcements: optional(object({
          public: optional(webServiceAlert()),
          wallet: optional(webServiceAlert()),
          sendBch: optional(webServiceAlert()),
          receiveBch: optional(webServiceAlert())
        }))
      }),
      btc: object({
        availability: object({
          send: bool(),
          request: bool(),
          exchangeTo: bool(),
          exchangeFrom: bool(),
          lockbox: bool(),
          history: bool(),
          report: bool(),
          fiat: bool()
        }),
        config: object({
          network: enumOf(['bitcoin', 'testnet'])
        })
      }),
      bch: object({
        availability: object({
          send: bool(),
          request: bool(),
          exchangeTo: bool(),
          exchangeFrom: bool(),
          lockbox: bool(),
          history: bool(),
          report: bool(),
          fiat: bool()
        })
      }),
      bsv: object({
        availability: object({
          send: bool(),
          request: bool(),
          exchangeTo: bool(),
          exchangeFrom: bool(),
          lockbox: bool()
        })
      }),
      eth: object({
        availability: object({
          send: bool(),
          request: bool(),
          exchangeTo: bool(),
          exchangeFrom: bool(),
          lockbox: bool(),
          history: bool(),
          fiat: bool()
        }),
        lastTxFuse: enumOf([600, 86400]),
        config: {
          network: enumOf(['mainnet', 'testnet'])
        }
      }),
      xlm: object({
        availability: object({
          send: bool(),
          request: bool(),
          exchangeTo: bool(),
          exchangeFrom: bool(),
          lockbox: bool(),
          history: bool(),
          fiat: bool()
        }),
        config: object({
          network: enumOf(['public', 'testnet'])
        })
      }),
      coinify: object({
        countries: arrayOf(country()),
        config: object({
          partnerId: enumOf([19, 24]),
          production: bool(),
          iSignThisDomain: string()
        })
      }),
      sfox: object({
        countries: arrayOf(country()),
        states: arrayOf(state()),
        config: object({
          production: bool(),
          apiKey: string(),
          plaid: string(),
          plaidEnv: enumOf(['production', 'sandbox']),
          siftScience: string()
        })
      }),
      shapeshift: object({
        availability: object({
          buy: bool(),
          sell: bool(),
          history: bool()
        }),
        countries: enumOf([arrayOf(country()), '*']),
        states: arrayOf(state()),
        config: object({
          apiKey: string(),
          upperLimit: number()
        })
      })
    }),
    ios: object({}),
    android: object({})
  }),
  domains: object({
    root: string(),
    api: string(),
    webSocket: string(),
    walletHelper: string(),
    comWalletApp: string(),
    comRoot: string(),
    ledger: string(),
    ledgerSocket: string(),
    horizon: string(),
    veriff: string()
  })
})

module.exports = {
  v3,
  v4
}
