const bip39 = require('bip39');
const { hdkey } = require('ethereumjs-wallet');
const MNEMONIC = '';
(async () => {
  var hdwallet = hdkey.fromMasterSeed(await bip39.mnemonicToSeed(MNEMONIC));
  const addrNode = hdwallet.derivePath("m/44'/60'/0'/0/0");
  const privateKey = addrNode.getWallet().getPrivateKey().toString('hex');
  console.log(privateKey);
})();
