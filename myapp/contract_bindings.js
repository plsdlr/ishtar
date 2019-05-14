const Web3 = require('web3');

const web3_for_accounts = new Web3(Web3.givenProvider || 'ws://localhost:8545', null, {}); //// getting accounts here

let _accounts

///this needs to be changed
var json = require("..."");

var contract = require("truffle-contract");

var Ishtar = contract(json);

//const web3 = new Web3.providers.HttpProvider("http://127.0.0.1:8545")

const eventProvider = new Web3.providers.WebsocketProvider('ws://localhost:8545')

Ishtar.setProvider(eventProvider);  ///THIS FAILS WITH NEW PROVIDER

async function pray_for_servent (address, amount) {
  const deployed = await Ishtar.deployed();
  const accounts = await web3_for_accounts.eth.getAccounts()
  const mint = await deployed.pray_for_servent(address,Number(amount),{ from: accounts[0]})
  const result = await deployed.totalSupply();
  return result
}

module.exports.pray_for_servent = pray_for_servent;


//  getcontract().then((sum) => {
//   console.log(Number(sum));
// });
