var HDWalletProvider = require("truffle-hdwallet-provider");
const dotenv = require('dotenv')
require('dotenv').config()

var mnemonic = process.env.MNEMONIC;
var infura_ropsten = process.env.INFURA_ROPSTEN;
var infura_mainnet = process.env.INFURA_MAINNET;

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*" // Match any network id
    },
    ropsten: {
      provider: function() {
        return new HDWalletProvider(mnemonic, infura_ropsten)
      },
      network_id: 3
    },
    mainnet: {
			provider: function() {
				return new HDWalletProvider(mnemonic, infura_mainnet, 1)
			},
			network_id: 1
		}
  }
};
