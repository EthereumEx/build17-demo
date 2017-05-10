const readline = require('readline')

let rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

exports.getValues = async (contract) => {
  let sellerAddress = contract.seller()
  let sellerPrice = contract.sellerPrice()
  let buyerAddress = contract.buyer()
  let buyerPrice = contract.buyerPrice()
  let referenceId = contract.referenceId()
  let contractState = contract.contractState()
  return {
    sellerAddress: await sellerAddress,
    sellerPrice: (await sellerPrice).toNumber(),
    buyerAddress: await buyerAddress,
    buyerPrice: (await buyerPrice).toNumber(),
    referenceId: await referenceId,
    contractState: await contractState
  }
}

exports.ask = async (question) => {
  return new Promise((resolve, reject) => {
    rl.question(question + '\n', (answer) => {
      return resolve(answer)
    })
  })
}
