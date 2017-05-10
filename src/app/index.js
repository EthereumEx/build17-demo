const config = require('./config')
const debug = require('debug')(config.role)
const lib = require('./lib')
const util = require('./util')

debug(`My address is: ${config.me}`)

lib.monitorChain(config.notificationAddress, async (err, result) => {
  if (err) {
    return debug('Error listening to contract events: ', err)
  }

  let contractValus = await util.getValues(result.contract)
  debug(contractValus, '\n\n')

  if (config.me !== contractValus.sellerAddress && config.me !== contractValus.buyerAddress) {
    return debug('I\'m not party to this transaction')
  }

  if (result.caller === config.me) {
    return debug('I was the one who made the change, waiting for the other party...')
  }

  let price = (await util.ask('What price would you like to sell/buy at? (n to exit)')).toLowerCase()
  if (price === 'n' || price === 'no') {
    process.exit(0)
  }

  await lib.unlockAccount(config.me, config.password)
  await lib.updateBooking(parseInt(price), result.contract)
})

const buy = async () => {
  let referenceId = await util.ask('Enter a booking reference Id')
  let price = await util.ask('What price would you like to sell/buy at?')
  await lib.unlockAccount(config.me, config.password)
  var contract = await lib.deployBookingContract(config.other, config.me, referenceId)
  await lib.updateBooking(parseInt(price), contract)
}

if (config.role === 'buyer') {
  buy()
}
