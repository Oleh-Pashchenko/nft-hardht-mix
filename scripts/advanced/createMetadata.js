const hre = require('hardhat');
const path = require('path');
const fs = require('fs');
const IPFS = require('ipfs');
let ipfs;
const sampleMetadata = require('../../metadata/sample.json');
const { breeds } = require('../helpers');

async function main() {
  const contractAddress = '0x5330EA0165437D6D7Cc54dC766C25B02990CB7cc';
  ipfs = await IPFS.create();

  const AdvancedCollectible = await hre.ethers.getContractFactory(
    'AdvancedCollectible'
  );

  const advancedCollectible = await AdvancedCollectible.attach(contractAddress);

  const tokenCounter = await advancedCollectible.tokenCounter();
  console.log(`Found ${tokenCounter.toString()} NFT tokens`);

  await writeMenatada(tokenCounter, advancedCollectible);
}

async function writeMenatada(tokensCoount, contract) {
  for (let tokenId = 0; tokenId < tokensCoount; tokenId++) {
    const collectibleMetadata = sampleMetadata;
    const breedsId = await contract.tokenIdToBreed(tokenId);
    const collectible = breeds[breedsId];
    const metadataFile = path.resolve(
      __dirname,
      '..',
      '..',
      'metadata',
      hre.network.name,
      `${tokenId.toString()}-${collectible}.json`
    );
    console.log(metadataFile);

    if (!fs.existsSync(metadataFile)) {
      collectibleMetadata.name = collectible;
      collectibleMetadata.description = `NFT collectible item ${collectibleMetadata.name}`;
      let imageToUpload;

      if (process.env.UPLOAD_IPFS) {
        const imagePath = path.resolve(
          __dirname,
          '..',
          '..',
          'img',
          `${collectible.replace('_', '-').toLowerCase()}.png`
        );
        console.log(imagePath);
        imageToUpload = await uploadToIPFS(fs.readFileSync(imagePath));

        collectibleMetadata.image = `ipfs://${imageToUpload}`;
        collectibleMetadata.description;
      }
      fs.writeFileSync(metadataFile, JSON.stringify(collectibleMetadata));
    } else {
      console.log(`Metadata for ${tokenId} ${collectible} already found`);
    }
  }
}

async function uploadToIPFS(imgdata) {
  const result = await ipfs.add(imgdata);

  return result.path;
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
