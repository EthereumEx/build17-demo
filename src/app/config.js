const path = require('path')
const rootPath = path.normalize(path.join(__dirname, '..'))
const contractDir = path.join(rootPath, 'truffle', 'build', 'contracts')

const getConract = (contractName) => {
  return require(path.join(contractDir, contractName))
}

let notification = getConract('Notification').networks
let keys = Object.keys(notification)

if (process.env.ADDRESS_NOTIFICATION && keys.length !== 1) {
  throw new Error('More than one notification address found, check your truffle networks')
}

module.exports = {
  env: process.env.NODE_ENV,
  root: rootPath,
  contractDir: contractDir,
  getConract: getConract,
  IpcProvider: process.env.IPC_PROVIDER,
  rpc: {
    host: process.env.RPC_HOST || 'http://localhost',
    port: process.env.RPC_PORT || '8545'
  },
  me: process.env.ADDRESS_ME,
  password: process.env.PASSWORD_ME,
  other: process.env.OTHER,
  role: process.env.ROLE || 'observer',
  notificationAddress: process.env.ADDRESS_NOTIFICATION || notification[keys[0]].address
}
