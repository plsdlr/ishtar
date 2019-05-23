const Web3 = require('web3')
require('dotenv').config()

const web3_for_accounts = new Web3(Web3.givenProvider || 'ws://localhost:8545', null, {}) //// getting accounts here
///this needs to be changed
const json_path = process.env.json_build_path
const json = require(json_path)
//var json = require('/home/p/Documents/dev/PassiveToken/experimental/build/contracts/Ishtar.json');

var contract = require('truffle-contract')
var Ishtar = contract(json)
const eventProvider = new Web3.providers.WebsocketProvider('ws://localhost:8545')
Ishtar.setProvider(eventProvider)  ///THIS FAILS WITH NEW PROVIDER

/* nonce for sending with tx */
let nonce = 0;

function raiseNonce() {
  nonce = nonce + 1
  return nonce
}

async function pray_for_servent (address, amount, signedMessage) {
  try {
    const deployed = await Ishtar.deployed()
    const accounts = await web3_for_accounts.eth.getAccounts()
    /* this is the test one */
    // await deployed.pray_for_servent(address, Number(amount), { from: accounts[0] })

    /* this is the one for deployment */
    await raiseNonce()
    await deployed.pray_for_servent(address, amount, nonce, signedMessage)

    const result = await deployed.totalSupply()
    //const newnumber = Web3.utils.BN(result).toString()
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
