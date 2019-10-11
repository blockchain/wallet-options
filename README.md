# wallet-options [![Build Status](https://travis-ci.org/blockchain/wallet-options.svg?branch=master)](https://travis-ci.org/blockchain/wallet-options)

Settings file used by Blockchain wallet clients:
 * [My-Wallet-V3-Frontend](https://github.com/blockchain/My-Wallet-V3-Frontend)
 * [My-Wallet-V3-iOS](https://github.com/blockchain/My-Wallet-V3-iOS)
 * [My-Wallet-V3-Android](https://github.com/blockchain/My-Wallet-V3-Android)

## Validation

Install node modules: `npm install`

Validate options files: `npm test`

Watch mode: `npm test -- --watch`

JSON format options: `npm run format [env?]`

## Deploy

To deploy to different environments (dev/staging/testnet/prod):

    ./scripts/upload.sh ENV
