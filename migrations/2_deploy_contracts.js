var SimpleStorage = artifacts.require('./SimpleStorage.sol');
var PostList = artifacts.require('./PostList.sol');

module.exports = function (deployer) {
	deployer.deploy(SimpleStorage);
	deployer.deploy(PostList);
};
