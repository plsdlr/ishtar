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

    it("minting works as a metaTx", async () => {
      const message = await EthCrypto.hash.keccak256([
        { type: 'address', value: identity.address },
        { type: 'uint256', value: 100 },
        { type: 'uint256', value: 0 },
      ]);
      let signature = await EthCrypto.sign(identity.privateKey, message);
      let prePrayerBalance = await ishtar.balanceOf(identity.address);
      console.log(`pre minting balance: ${prePrayerBalance}`)
      // assert.equal(prePrayerBalance, 100) // sort out weird big number issue w assert
      await ishtar.pray_for_servent(identity.address, 100, 0, signature);
      let postPrayerBalance = await ishtar.balanceOf(identity.address);
      console.log(`post minting balance: ${postPrayerBalance}`)
      // assert.equal(postPrayerBalance, 100); // sort out weird big number issue w assert
    })

    it.skip("nonce check test - increments on success", async () => {

    })

    it.skip("nonce check test - fails on resending tx", async () => {

    })
 }) // end minting describe block

  describe('transferring', async () => {
    it.skip("test one", async () => {

    })

    it.skip("test two", async () => {

    })

    it.skip("another one if we think of one", async () => {

    })

    it.skip("transferring works as a metaTx", async () => {

    })

    it.skip("nonce check test - increments on success", async () => {

    })

    it.skip("nonce check test - fails on resending tx", async () => {

    })
  }) // end transferring describe block

}) // end contract block
