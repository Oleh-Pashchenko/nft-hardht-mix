const hre = require('hardhat');
const { breeds } = require('../helpers');

async function main() {
  const contractAddress = '';
  const AdvancedCollectible = await hre.ethers.getContractFactory(
    'AdvancedCollectible'
  );

  const advancedCollectible = await AdvancedCollectible.attach(contractAddress);

  const tokenCounter = await advancedCollectible.tokenCounter();
  console.log(`Found ${tokenCounter.toString()} NFT tokens`);
  await setTokenURI(tokenCounter, advancedCollectible);
}

async function setTokenURI(tokensCoount, contract) {
  for (let tokenId = 0; tokenId < tokensCoount; tokenId++) {
    const uri = (await contract.tokenURI(tokenId)).toString();
    if (uri.includes('ipfs://')) {
      console.log(`Token: ${tokenId} already has an image`);
    } else {
      const breedId = await contract.tokenIdToBreed(tokenId);
      const collectible = breeds[breedId];
      const newURI = require(`../../metadata/${
        hre.network.name
      }/${tokenId.toString()}-${collectible}.json`);
      await contract.setTokenURI(tokenId, newURI.image);
      console.log(`Added URI to ${collectible} by ${tokenId} token id`);
    }
  }

  console.log(
    'Please give up to 20 minutes, and hit the "refresh metadata" button'
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
