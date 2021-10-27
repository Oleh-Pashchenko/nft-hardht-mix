const hre = require('hardhat');
const { breeds } = require('../helpers');

async function main() {
  const contractAddress = '';

  const AdvancedCollectible = await hre.ethers.getContractFactory(
    'AdvancedCollectible'
  );

  const advancedCollectible = AdvancedCollectible.attach(contractAddress);

  const tx = await advancedCollectible.createCollectible('None');
  const receipt = await tx.wait();
  const requestId = receipt.events?.filter((x) => {
    return x.event == 'CequestedCollctible';
  })[0]?.args.requestId;

  if (requestId) {
    const tokenId = await advancedCollectible.requestIdToTokenId(requestId);
    const breed = await advancedCollectible.tokenIdToBreed(tokenId);

    console.log('New token created as:', breeds[+breed.toString()]);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
