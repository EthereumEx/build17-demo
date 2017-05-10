const Notification = artifacts.require('./Notification.sol')

module.exports = (deployer) => {
  deployer.deploy(Notification)
}
