const Web3 = require('web3')
const EthCrypto = require('eth-crypto')
require('dotenv').config()

const web3_for_accounts = new Web3(Web3.givenProvider || 'ws://localhost:8545', null, {}) //// getting accounts here
///this needs to be changed
const json_path = process.env.json_build_path
const json = require(json_path)

var contract = require('truffle-contract')
var Ishtar = contract(json)
const eventProvider = new Web3.providers.WebsocketProvider('ws://localhost:8545')
Ishtar.setProvider(eventProvider)  ///THIS FAILS WITH NEW PROVIDER

/* nonce for sending with tx */
// let nonce = 0;
//
// function raiseNonce() {
//   return nonce++
// }

async function pray_for_servent (address, amount, _nonce, signedMessage) {
  try {
    const deployed = await Ishtar.deployed()
    const accounts = await web3_for_accounts.eth.getAccounts()
    await deployed.pray_for_servent(address, amount, _nonce, signedMessage, { from: accounts[0] })
    const result = await deployed.totalSupply()
    const fixed_number = Web3.utils.BN(result).toString()
    return fixed_number
  }
  catch (e){
    console.log(e)
    return 'service unavailable'
  }
}


async function get_balance (address) {
  try {
    const deployed = await Ishtar.deployed()
    const result = await deployed.balanceOf(address)
    const fixed_number = Web3.utils.BN(result).toString()
    return fixed_number
  }
  catch (e){
    return 'service unavailable'
  }
}

async function transfer_blessing (addressFrom, addressTo, amount, signedMessage) {
  try {
    const deployed = await Ishtar.deployed()
    //await raiseNonce()
    //await deployed.spend_blessing(addressFrom, addressTo, amount, nonce, signedMessage)
    let fromBalance = await deployed.balanceOf(addressFrom)
    let toBalance = await deployed.balanceOf(addressTo)
    return (fromBalance, toBalance)
  }
  catch (e){
    return 'service unavailable'
  }
}

module.exports.pray_for_servent = pray_for_servent
module.exports.get_balance = get_balance
module.exports.transfer_blessing = transfer_blessing
