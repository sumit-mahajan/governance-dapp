var GovToken = artifacts.require('./GovToken.sol');

module.exports = function (deployer) {
  deployer.deploy(GovToken);
};
