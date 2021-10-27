const breeds = ['PUG', 'SHIBA_INU', 'ST_BERNARD'];
const openseaTokenURI = (contractAddress, tokenId) =>
  `https://testnets.opensea.io/assets/${contractAddress}/${tokenId}`;

module.exports = {
  breeds,
  openseaTokenURI,
};
