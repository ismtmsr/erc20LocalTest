const KaulaTestToken = artifacts.require('./KaulaTestToken.sol')

module.exports = function (deployer, network, accounts) {
  const name = "KaulaTestToken"
  const symbol = "KTTKN"
  const decimals = 18
  const initSupply = web3.utils.toBN(100 * (10 ** decimals))

  return deployer.then(() => {
    return deployer.deploy(
      KaulaTestToken,
      name,
      symbol,
      decimals,
      initSupply
    )
  })
}
