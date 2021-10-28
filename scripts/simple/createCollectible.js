const hre = require('hardhat');
const { openseaTokenURI } = require('../helpers');
const contractAddress = '';
const tokenURI = '';

async function main() {
  const Contract = await hre.ethers.getContractFactory('SimpleCollectible');
  const contract = Contract.attach(contractAddress);
  const tokenCounter = await advancedCollectible.tokenCounter();

  await contract.createCollectible(tokenURI);

  console.log(
    `Awesome! You can view your NFT at ${openseaTokenURI(
      contractAddress,
      tokenCounter.toString()
    )}`
  );

  console.log(
    'Please give up to 20 minutes, and hit the "refresh metadata" button'
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
