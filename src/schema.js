const {
  arrayOf,
  bool,
  coin,
  country,
  either,
  enumOf,
  fraction,
  integer,
  just,
  localizedMessage,
  number,
  nullable,
  object,
  optional,
  state,
  string,
  webServiceAlert
} = require("./types");

const v3 = object({
  enableDomainMigrationRedirects: bool(),
  domains: object({
    root: string(),
    comRoot: nullable(string()),
    comWalletApp: nullable(string()),
    webSocket: string(),
    api: string(),
    walletHelperUrl: string(),
    stellarHorizon: string()
  }),
  network: enumOf(["bitcoin", "testnet"]),
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
    countries: either(just("*"), arrayOf(country())),
    lastTxFuse: number(),
    rolloutFraction: fraction(),
    surveyLinks: arrayOf(nullable(string()))
  }),
  bcash: object({
    feePerByte: integer()
  }),
  xlm: object({
    operationFee: integer(),
    sendTimeOutSeconds: integer()
  }),
  xlmExchange: object({
    exchangeAddresses: arrayOf(string())
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
    showUnocoin: bool()
  }),
  android_update: object({
    updateType: string(),
    latestStoreVersion: string()
  }),
  ios: object({
    update: object({
      updateType: string(),
      latestStoreVersion: string()
    })
  }),
  mobile_notice: optional(localizedMessage()),
  mobileInfo: optional(localizedMessage()),
  webHardFork: object({}),
  maintenance: bool()
});

const v4 = object({
  platforms: object({
    web: object({
      application: object({
        analyticsSiteId: optional(number()),
        environment: enumOf(["dev", "testnet", "staging", "prod"]),
        announcements: optional(
          object({
            lockbox: optional(webServiceAlert()),
            public: optional(webServiceAlert()),
            request: optional(webServiceAlert()),
            send: optional(webServiceAlert()),
            swap: optional(webServiceAlert()),
            wallet: optional(webServiceAlert())
          })
        )
      }),
      ads: object({
        blacklist: arrayOf(),
        url: string()
      }),
      coins: object({
        BTC: coin(),
        BCH: coin(),
        BSV: coin(),
        ETH: coin(),
        PAX: coin(),
        STX: coin(),
        XLM: coin()
      }),
      coinify: object({
        countries: arrayOf(country()),
        config: object({
          partnerId: enumOf([19, 24, 35]),
          production: bool(),
          iSignThisDomain: string()
        })
      }),
      sift: object({
        apiKey: string()
      })
    }),
    ios: object({}),
    android: object({})
  }),
  domains: object({
    api: string(),
    bitpay: string(),
    coinify: string(),
    coinifyPaymentDomain: string(),
    comRoot: string(),
    comWalletApp: string(),
    exchange: string(),
    horizon: string(),
    ledger: string(),
    ledgerSocket: string(),
    mainProcess: string(),
    root: string(),
    securityProcess: string(),
    veriff: string(),
    walletHelper: string(),
    webSocket: string()
  })
});

module.exports = { v3, v4 };
