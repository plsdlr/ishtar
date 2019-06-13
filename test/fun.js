const Ishtar = artifacts.require('./Ishtar')
const Token = artifacts.require('./ERC20')
const EthCrypto = require("eth-crypto");

let ishtar

contract("isthar", async accounts => {
  before("deploy contracts", async () => {
    ishtar = await Ishtar.deployed()
  })

  describe('minting', () => {
    it("verify simple signature", async () => {
      const signerIdentity  = EthCrypto.createIdentity();
      const message = EthCrypto.hash.keccak256([
        { type: "uint256", value: "5" },
        { type: "string", value: "Banana" }
      ]);
      const signature = EthCrypto.sign(signerIdentity.privateKey, message);
      console.log(signature)
      const hash_contract = await ishtar.checkrec_test.call(5,"Banana",signature)
      console.log(hash_contract)
    })

  }) // end describe block
}) // end contract block
