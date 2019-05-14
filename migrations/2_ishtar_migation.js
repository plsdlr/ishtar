const fse = require('fs-extra')

const Token = artifacts.require('./ERC20.sol')
const Ishtar = artifacts.require('./Ishtar.sol')


//const config = process.env.target != 'mainnet' ? require('./config.json').test : require('./config.json').mainnet

module.exports = (deployer, network, accounts) => {
  deployer.then(async () => {

    await deployer.deploy(Ishtar,{ gas: 6500000 });

  })
}
