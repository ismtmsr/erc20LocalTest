const KaulaTestToken = artifacts.require("./KaulaTestToken.sol")

contract("KaulaTestToken", accounts => {
  it("should put 100KTTKN in the first account.", async () => {
    // コントラクトのインスタンスを取得
    const kaulaTestTokenInstance = await KaulaTestToken.deployed()

    // account[0]のトークンの残高取得
    let balance = await kaulaTestTokenInstance.balanceOf(accounts[0])
    // 桁数が大きいのでether単位に変換
    balance = web3.utils.fromWei(balance, "ether")

    assert.equal(balance, 100, "first account don't have 100 KTTKN.")
  })

  it("must be mintable", async () => {
    // コントラクトのインスタンスを取得
    const kaulaTestTokenInstance = await KaulaTestToken.deployed()

    // accounts[0]のトークンの残高取得
    let coinbaseBalance = await kaulaTestTokenInstance.balanceOf(accounts[0])
    coinbaseBalance = web3.utils.fromWei(coinbaseBalance, "ether")
    // accounts[1]のトークン残高取得
    let balanceBeforeMint = await kaulaTestTokenInstance.balanceOf(accounts[1])
    balanceBeforeMint = web3.utils.fromWei(balanceBeforeMint, "ether")
    assert.equal(balanceBeforeMint, 0, "second account have KTTKN.")

    // 50KTTKN追加発行
    const value = 50
    const valueWei = web3.utils.toBN(value * (10 ** 18))
    await kaulaTestTokenInstance.mint(
      accounts[1],
      valueWei
    )

    // accounts[1]に追加されていること
    let balanceAfterMinted = await kaulaTestTokenInstance.balanceOf(accounts[1])
    balanceAfterMinted = web3.utils.fromWei(balanceAfterMinted, "ether")
    console.debug('balanceBeforeMint:', balanceBeforeMint)
    console.debug('value:', value)
    console.debug('balanceAfterMinted:', balanceAfterMinted)
    assert.equal(balanceAfterMinted, Number(balanceBeforeMint + value), "second account's balance is invalid.")

    // accounts[0]の残高に変更はないこと
    assert.equal(coinbaseBalance, 100, "first account's balance is invalid")
  })

})
