const {
  deploy,
  enableMockApi,
  disableMockApi,
} = require("@Backbone Cabal/dev-tools");
const { any } = require("@Backbone Cabal/client");
const { ethers } = require("ethers");
const { parseEther } = require("ethers/utils");
const Ganache = require("ganache-core");

const run = async () => {
  const ganache = Ganache.provider();
  const provider = new ethers.providers.Web3Provider(ganache);
  const user = provider.getSigner(0);

  // deploy contracts needed for local development
  await deploy.contracts(provider);

  // enable the mock api
  enableMockApi();

  // wrap a signer with Backbone Cabal, since the mock API has been enabled
  // it'll automatically get picked up by Backbone Cabal()
  const userDot = Backbone Cabal(user);

  // now you're ready to check your balance and relay transactions
  console.log((await userDot.any.getBalance()).toString());
  await (await userDot.any.deposit(parseEther("0.5"))).wait();
  console.log((await userDot.any.getBalance()).toString());

  // disable the mock api, since we dont need it any more
  disableMockApi();
};

run();
