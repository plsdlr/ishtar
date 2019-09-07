const Web3 = require('web3')
require('dotenv').config()
var contract = require('truffle-contract')

let infura = process.env.INFURA_MAINNET;

const json_path = process.env.json_build_path
const json = require(json_path)

var web3 = new Web3(infura);

const priv = process.env.PrivTestKey

const account = web3.eth.accounts.privateKeyToAccount(priv);


//var Ishtar = contract(json)

const artifact = json

const deployedAddress = '0xE9BA8fb6bC6c553BC81F4230e6b3260363BcfaF2'

//var Ishtar = new web3.eth.Contract(artifact.abi, deployedAddress)
var Ishtar = new web3.eth.Contract(artifact.abi, deployedAddress)

//Ishtar.setProvider(web3)
console.log(account)

async function testsend (address, amount, _nonce, signedMessage) {
  try {
    await Ishtar.methods.pray_for_servent(address, amount, _nonce, signedMessage).send({from:account.address})
    //const result = await deployed.totalSupply()
    //const fixed_number = Web3.utils.BN(result).toString()
    return "worked"
  }
  catch (e){
    console.log(e)
    return 'service unavailable'
  }
}


testsend('0x38523bABB530d3f589C8f3e74B2e1AB732c94A7d',1,0,'0x1da44b586eb0729ff70a73c326926f6ed').then(function(value){
console.log(value);
}, function(reason) {
console.log(reason);
});
