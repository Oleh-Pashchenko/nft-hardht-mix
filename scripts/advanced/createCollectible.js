const hre = require('hardhat');
const { breeds } = require('../helpers');

const contractAddress = '';
const contractName = '';

async function main() {
  const Contract = await hre.ethers.getContractFactory(contractName);
  const contract = Contract.attach(contractAddress);

  const tx = await contract.createCollectible('None');
  const receipt = await tx.wait();
  const requestId = receipt.events?.filter((x) => {
    return x.event == 'CequestedCollctible';
  })[0]?.args.requestId;

  if (requestId) {
    const tokenId = await contract.requestIdToTokenId(requestId);
    const breed = await contract.tokenIdToBreed(tokenId);

    console.log('New token created as:', breeds[+breed.toString()]);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
