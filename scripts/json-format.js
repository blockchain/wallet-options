const fs = require('fs')
const path = require('path')

let envs = ['prod', 'staging', 'dev', 'testnet']
let input = process.argv[2]

let formatEnvs = []
if (envs.includes(input)) {
  formatEnvs = [input]
} else if (input == null) {
  formatEnvs = envs
} else {
  throw new Error('Must specify a valid env to json format!')
}

formatEnvs.forEach(env => {
  let options = require(`../${env}/wallet-options.json`)
  fs.writeFileSync(
    path.resolve(__dirname, '..', env, 'wallet-options.json'),
    JSON.stringify(options, null, 2)
  )
})
