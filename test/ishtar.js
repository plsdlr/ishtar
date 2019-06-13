const Ishtar = artifacts.require('./Ishtar')
const Token = artifacts.require('./ERC20')

const EthCrypto = require('eth-crypto')


let ishtar
let token


contract("isthar", async accounts => {
  const createHash = (recipient, amount, nonce, contractAddress) => {
    const signHash = EthCrypto.hash.keccak256([
    {
        type: 'address',
        value: recipient
    }, {
        type: 'uint256',
        value: amount
    }, {
        type: 'uint256',
        value: nonce
    }, {
        type: 'address',
        value: contractAddress
    }]);
    return signHash
  }
    const signHash = (hash, identity) => {
    var signed = EthCrypto.sign(hash, identity.privateKey);
    return signed;
  }

  before("deploy contracts", async () => {
    ishtar = await Ishtar.deployed()
    identity = EthCrypto.createIdentity();
  })

  describe('minting', () => {

  it("verify hash", async () => {
    const final_hash = createHash(identity.address,100,0,ishtar.address,identity)
    const hash_contract = await ishtar.checkhash_test.call(identity.address,100,0,ishtar.address)
    assert.equal(final_hash, hash_contract)
  })


  it("get_recovered_adress", async () => {
    const final_hash = createHash(identity.address,100,0,ishtar.address,identity)
    const signed_hash = signHash(final_hash,identity)
    console.log(signed_hash)
    const re_address = await ishtar.rec_test.call(identity.address,100,0,ishtar.address,final_hash)
    assert.equal(identity.address, re_address)
  })


 })

})
