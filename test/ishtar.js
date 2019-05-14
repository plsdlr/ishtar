const Ishtar = artifacts.require('./Ishtar')
const Token = artifacts.require('./ERC20')

let ishtar
let token

contract("isthar", async accounts => {

  before("deploy contracts", async () => {
    ishtar = await Ishtar.deployed()
  })

  describe('minting', () => {
  it("happy path", async () => {

    await ishtar.pray_for_servent(accounts[1],100,{ from: accounts[0]})

    let balance = await ishtar.balanceOf(accounts[1]);
    console.log(Number(balance))

   })
  })

})
