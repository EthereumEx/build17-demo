const Web3 = require('web3')
const Promise = require('bluebird')
const config = require('./config')
const debug = require('debug')(config.role)

const BookingContract = config.getConract('Booking')
const NotificationContract = config.getConract('Notification')

const web3 = new Web3(new Web3.providers.HttpProvider(`${config.rpc.host}:${config.rpc.port}`))

exports.unlockAccount = (account, password) => {
  return new Promise((resolve, reject) => {
    web3.personal.unlockAccount(account, password, (err, result) => {
      if (err) {
        debug('Failed to unlock account', account)
        return reject(err)
      }
      debug('Successfully unlocked account', account)
      resolve()
    })
  })
}

const estimateGas = (byteCode, multiplier = 4) => {
  return new Promise((resolve, reject) => {
    web3.eth.estimateGas({data: byteCode}, (err, gas) => {
      if (err) {
        debug('Failed to estimate gas')
        return reject(err)
      }
      resolve(gas * multiplier)
    })
  })
}

exports.deployBookingContract = async (seller, buyer, referenceId) => {
  let gas = await estimateGas(BookingContract.unlinked_binary)
  return new Promise((resolve, reject) => {
    let data = {
      from: config.me,
      data: BookingContract.unlinked_binary,
      gas: gas
    }

    let contract = web3.eth.contract(BookingContract.abi)
    contract.new(seller, buyer, referenceId, config.notificationAddress, data, (err, deployed) => {
      if (err) {
        debug('err creating contract', err)
        return reject(err)
      }

      if (!deployed.address) {
        debug('TransactionHash: ' + deployed.transactionHash + ' waiting to be mined...')
        return
      }

      debug('Contract mined! Address: ' + deployed.address)
      resolve(deployed)
    })
  })
}

exports.updateBooking = (price, contract) => {
  return new Promise((resolve, reject) => {
    contract.updateBooking(price, { from: config.me }, (err, result) => {
      if (err) {
        debug('err updating booking', err)
        return reject(err)
      }
      debug('Successfully updated booking: ' + result)
      resolve(result)
    })
  })
}

exports.monitorChain = (address, cb) => {
  debug(`Listening for events from contract: ${address}`)
  const notification = web3.eth.contract(NotificationContract.abi).at(address)
  notification.allEvents((err, result) => {
    if (err) {
      return cb(err, null)
    }

    cb(null, {
      contract: web3.eth.contract(BookingContract.abi).at(result.args.contractOrigin),
      caller: result.args.caller
    })
  })
}
