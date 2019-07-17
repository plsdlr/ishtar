const Web3 = require('web3')
const assert = require('assert')

const web3 = new Web3('http://localhost:8545', null)

function assert_mint(address, amount){
  try{
    assert.equal(web3.utils.isAddress(address), true, 'Not ETH address')
    assert.equal(Number.isInteger(amount), true, 'Amount is not Int')
    return true
  } catch(e){
    return false
  }
}

function assert_get_balance(address){
  try{
    assert.equal(web3.utils.isAddress(address), true, 'Not ETH address')
    return true
  } catch(e){
    return false
  }
}

function assert_transfer(address_from, address_send, nonce, amount){
  try{
    assert.equal(web3.utils.isAddress(address_from), true, 'sender not ETH address')
    assert.equal(web3.utils.isAddress(address_send), true, 'nor ETH address')
    assert.equal(Number.isInteger(amount), true, 'Amount is not Int')
    assert.equal(Number.isInteger(nonce), true, 'Nonce is not Int')
    return true
  } catch(e){
    console.log(e)
    return false
  }
}

module.exports.assert_mint = assert_mint
module.exports.assert_get_balance = assert_get_balance
module.exports.assert_transfer = assert_transfer
