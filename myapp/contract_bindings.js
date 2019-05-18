const Web3 = require('web3')
require('dotenv').config()

const web3_for_accounts = new Web3(Web3.givenProvider || 'ws://localhost:8545', null, {}) //// getting accounts here
///this needs to be changed
const json_path = process.env.json_build_path
const json = require(json_path)
//var json = require('/home/p/Documents/dev/PassiveToken/experimental/build/contracts/Ishtar.json');

var contract = require('truffle-contract')

var Ishtar = contract(json)

//const web3 = new Web3.providers.HttpProvider("http://127.0.0.1:8545")

const eventProvider = new Web3.providers.WebsocketProvider('ws://localhost:8545')

Ishtar.setProvider(eventProvider)  ///THIS FAILS WITH NEW PROVIDER

async function pray_for_servent (address, amount) {
  try {
    const deployed = await Ishtar.deployed()
    const accounts = await web3_for_accounts.eth.getAccounts()
    await deployed.pray_for_servent(address, Number(amount), { from: accounts[0] })
    const result = await deployed.totalSupply()
    return result
  }
  catch (e){
    return 'service unavailable'
  }
}


async function get_balance (address) {
  try {
    const deployed = await Ishtar.deployed()
    const result = await deployed.balanceOf(address)
    return result
  }
  catch (e){
    return 'service unavailable'
  }
}


module.exports.pray_for_servent = pray_for_servent
module.exports.get_balance = get_balance

//  getcontract().then((sum) => {
//   console.log(Number(sum));
// });
