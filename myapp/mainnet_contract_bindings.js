const EthereumTx = require('ethereumjs-tx').Transaction
const Web3 = require('web3')
const EthCrypto = require('eth-crypto')
require('dotenv').config()
const json_path = process.env.json_build_path
const json = require(json_path)


let infura = process.env.INFURA_MAINNET;

const web3 = new Web3(infura)

const account1 = '0x117A2220070f3dD8AC1bDdA97d2f73c90b51D9Cd'

const privateKey1 = Buffer.from(process.env.MainnetKey,'hex')

const contractAddress = '0xE9BA8fb6bC6c553BC81F4230e6b3260363BcfaF2'

const contractABI = json.abi

const contract = new web3.eth.Contract( contractABI, contractAddress)


async function pray_for_servent (address, amount, _nonce, signedMessage) {
  try {
      var data = contract.methods.pray_for_servent(address, amount, _nonce, signedMessage).encodeABI()
      await send_infura(data)
    }
    catch (e){
      console.log(e)
      return 'service unavailable'
    }
  }


async function send_infura(data){
  web3.eth.getTransactionCount(account1, data, (err, txCount) => {

    const txObject = {
      nonce:    web3.utils.toHex(txCount),
      gasLimit: web3.utils.toHex(800000), // Raise the gas limit to a much higher amount
      gasPrice: web3.utils.toHex(web3.utils.toWei('20', 'gwei')),
      to: contractAddress,
      data: data
    }

    const tx = new EthereumTx(txObject)
    tx.sign(privateKey1)

    const serializedTx = tx.serialize()
    const raw = '0x' + serializedTx.toString('hex')

    web3.eth.sendSignedTransaction(raw, (err, txHash) => {
      console.log('err:', err, 'txHash:', txHash)
    // Use this txHash to find the contract on Etherscan!
  })
})
}

async function transfer_blessing (addressFrom, addressTo, nonce, amount, signedMessage) {
  try {
	var data = contract.methods.spend_blessing(address, amount, _nonce, signedMessage).encodeABI()
      	await send_infura(data)
	}
    catch (e){
      console.log(e)
      return 'service unavailable'
    }
  }

async function get_balance (address) {
	return 2
}


module.exports.pray_for_servent = pray_for_servent
module.exports.get_balance = get_balance
module.exports.transfer_blessing = transfer_blessing
