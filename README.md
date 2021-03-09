# wallet-options [![Build Status](https://travis-ci.org/blockchain/wallet-options.svg?branch=master)](https://travis-ci.org/blockchain/wallet-options)

Settings file used by Blockchain wallet clients excluding Web:
 * [My-Wallet-V3-iOS](https://github.com/blockchain/My-Wallet-V3-iOS)
 * [My-Wallet-V3-Android](https://github.com/blockchain/My-Wallet-V3-Android)

👋 Web wallet no longer uses wallet-options. It is now handled via application definitions!

## Validation

Install node modules: `npm install`

Validate options files: `npm test`

Watch mode: `npm test -- --watch`

JSON format options: `npm run format [env?]`

## Deploy

To deploy to different environments (dev/staging/testnet/prod):

    ./scripts/upload.sh ENV
