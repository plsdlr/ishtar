const Web3 = require('web3')
const assert = require('assert')

function assert_mint(adress, amount){
  try{
    assert.equal(Web3.utils.isAddress(adress), true, 'Not ETH Adress')
    assert.equal(Number.isInteger(amount), true, 'Amount is not Int')
    return true
  } catch(e){
    return false
  }
}

function assert_get_balance(adress){
  try{
    assert.equal(Web3.utils.isAddress(adress), true, 'Not ETH Adress')
    return true
  } catch(e){
    return false
  }
}

module.exports.assert_mint = assert_mint
module.exports.assert_get_balance = assert_get_balance
