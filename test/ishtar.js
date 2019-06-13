const Ishtar = artifacts.require('./Ishtar')
const Token = artifacts.require('./ERC20')
const EthCrypto = require('eth-crypto')

let ishtar
let token

contract("isthar", async (accounts) => {
  before("deploy contracts", async () => {
    ishtar = await Ishtar.deployed()
    identity = EthCrypto.createIdentity();
  })
  describe('minting', () => {
    it("verifies address", async () => {
      const message = await EthCrypto.hash.keccak256([
        { type: 'address', value: identity.address },
        { type: 'uint256', value: 100 },
        { type: 'uint256', value: 0 },
      ]);
      var signature = await EthCrypto.sign(identity.privateKey, message);
      const hash_contract = await ishtar.recoverSigner(message, signature)
      assert.equal(hash_contract, identity.address)
    })

    it("verifies data validity from client side address", async () => {
      const message = await EthCrypto.hash.keccak256([
        { type: 'address', value: identity.address },
        { type: 'uint256', value: 100 },
        { type: 'uint256', value: 0 },
      ]);
      let signature = await EthCrypto.sign(identity.privateKey, message);
      const validated = await ishtar.isValidPrayer(identity.address, 100, 0, signature, identity.address);
      assert.equal(validated, true)
    })

    it.skip("nonce check test - increments on success", async () => {

    })

    it.skip("nonce check test - fails on resending tx", async () => {

    })

    it.skip("minting works as a metaTx", async () => {
      // add 'isValidData' function to minting function in smart contract
      // const hash_contract = await ishtar.checkhash_test.call(identity.address,100,0,ishtar.address)
    })
 }) // end minting describe block

  describe('transferring', async () => {
    it.skip("test one", async () => {

    })

    it.skip("test two", async () => {

    })

    it.skip("another one if we think of one", async () => {

    })

    it.skip("nonce check test - increments on success", async () => {

    })

    it.skip("nonce check test - fails on resending tx", async () => {

    })

    it.skip("transferring works as a metaTx", async () => {

    })
  }) // end transferring describe block

}) // end contract block
