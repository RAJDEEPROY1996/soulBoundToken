const SoulboundToken = artifacts.require("soulboundToken");

module.exports = function (deployer) {
  deployer.deploy(SoulboundToken,"SoulBoundToken","SBT");
};
