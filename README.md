# wallet-options [![Build Status](https://travis-ci.org/blockchain/wallet-options.png?branch=master)](https://travis-ci.org/blockchain/wallet-options)

Settings file used by Blockchain wallet clients:
 * [My-Wallet-V3-Frontend](https://github.com/blockchain/My-Wallet-V3-Frontend)
 * [My-Wallet-V3-iOS](https://github.com/blockchain/My-Wallet-V3-iOS)
 * [My-Wallet-V3-Android](https://github.com/blockchain/My-Wallet-V3-Android)

## Validation

Install node modules: `yarn`

Validate options files: `yarn test`

Watch mode: `yarn test --watch`

## Deploy

To deploy to different environments (dev/staging/testnet/prod):

    ./scripts/upload.sh ENV
