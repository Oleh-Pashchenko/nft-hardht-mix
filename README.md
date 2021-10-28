# NFT Hardhat MIX

I would like to say thank you to [Patrick Collins](https://github.com/PatrickAlphaC) for the inspiration to build this project.
This is a reference and hardhat/JS vision of [nft-mix](https://github.com/PatrickAlphaC/nft-mix) (original project) with the cute doggies.

<br/>
<p align="center">
<a href="https://chain.link" target="_blank">
<img src="https://raw.githubusercontent.com/PatrickAlphaC/nft-mix/main/img/shiba-inu.png" width="225" alt="NFT Shiba Inu">
<img src="https://raw.githubusercontent.com/PatrickAlphaC/nft-mix/main/img/pug.png" width="225" alt="NFT Pug">
<img src="https://raw.githubusercontent.com/PatrickAlphaC/nft-mix/main/img/st-bernard.png" width="225" alt="NFT St.Bernard">
</a>
</p>
<br/>

## Prerequisites

Please install or have installed the following:

- [nodejs and npm](https://nodejs.org/en/download/)
- [npx](https://github.com/npm/npx)

## Installation

1. Clone this repo

```
git clone https://github.com/Oleh-Pashchenko/nft-hardht-mix.git
cd nft-hardht-mix
```

2. Install dependencies

```
npm install
```

3. Set your environment variables

Set your `ETHERSCAN_API_KEY`, `ROPSTEN_URL`, `RINKEBY_URL`, `BSCTESTNET_URL`, `UPLOAD_IPFS`, and `PRIVATE_KEY` [environment variables](https://www.twilio.com/blog/2017/01/how-to-set-environment-variables.html).

You can get a `ETHERSCAN_API_KEY` from [etherscan](https://etherscan.io) or [bscscan](https://bscscan.com/). That's need to verify your contracts on the \*scan to able to use methods.

You can get a `ROPSTEN_URL`, `RINKEBY_URL`, by getting a free trial of [Infura](https://infura.io/). You can find your `PRIVATE_KEY` from your ethereum wallet like [metamask](https://metamask.io/).
Set `UPLOAD_IPFS` as `true` to allow use IPFS to save your images.

You can learn more about the [IPFS](http://ipfs.io) here.

Also, there is a special script `privateKey.js` to get the `private key` by `mnemonic` phrase.

# Usage

There are 2 types of NFTs here.

1. `SimpleCollectibles.sol`
2. `AdvancedCollectibles.sol`

They each deploy unique dogs. The advanced version gives you a random breed (out of a Pug, Shiba Inu, and St. Bernard).

You can 100% use the rinkeby testnet to see your NFTs rendered on opensea, but it's suggested that you test and build on a local development network so you don't have to wait as long for transactions.

### Running Scripts

The simple collectibles work on a local network or testnet.
In `hardhat.config.js` I setup `defaultNetwork` as 'bsctestnet', you could set up your option.

> Use `npx hardhat verify contractAddress` to verify your contracts.

Before running scripts setup a `contractName` in scripts that you would like to work with. And after deploying the setup `contractAddress` in each of the scripts.

# For the Simple ERC721

```
npx hardhat run scripts/simple/deploy.js
npx hardhat run scripts/simple/createCollectible.js
```

# For the AdvancedCollectible ERC721

```
npx hardhat run scripts/advanced/deploy.js
npx hardhat run scripts/advanced/createCollectible.js
```

Then:

```
npx hardhat run scripts/advanced/createMetadata.js
npx hardhat run scripts/advanced/setTokenURI.js
```

# For the AdvancedVRFCollectible ERC721

The same with AdvancedCollectible but in the contract `AdvancedVRFCollectible.sol` you should setup the `VRF Coordinator`, `LINK Token`, `keyHash` and `fee`. These variables depend on the network you have chosen, you could get more details [here](https://docs.chain.link/docs/vrf-contracts/).

And after that you should send someone [LINK](https://faucets.chain.link) tokens to your deployed contract before using `createCollectible`.

# Hardhat Project

This project demonstrates an advanced Hardhat use case, integrating other tools commonly used alongside Hardhat in the ecosystem.

The project comes with a sample contract, a test for that contract, a sample script that deploys that contract, and an example of a task implementation, which simply lists the available accounts. It also comes with a variety of other tools, preconfigured to work with the project code.

Try running some of the following tasks:

```shell
npx hardhat accounts
npx hardhat compile
npx hardhat clean
npx hardhat test
npx hardhat node
npx hardhat help
REPORT_GAS=true npx hardhat test
npx hardhat coverage
npx hardhat run scripts/deploy.js
node scripts/deploy.js
npx eslint '**/*.js'
npx eslint '**/*.js' --fix
npx prettier '**/*.{json,sol,md}' --check
npx prettier '**/*.{json,sol,md}' --write
npx solhint 'contracts/**/*.sol'
npx solhint 'contracts/**/*.sol' --fix
```

# Etherscan verification

To try out Etherscan verification, you first need to deploy a contract to an Ethereum network that's supported by Etherscan, such as Ropsten.

In this project, copy the .env.example file to a file named .env, and then edit it to fill in the details. Enter your Etherscan API key, your Ropsten node URL (eg from Alchemy), and the private key of the account which will send the deployment transaction. With a valid .env file in place, first deploy your contract:

> Be careful in this project deploy scripts are in special folders for different contracts (advanced, simple)

```shell
hardhat run --network ropsten scripts/deploy.js
```

Then, copy the deployment address and paste it in to replace `DEPLOYED_CONTRACT_ADDRESS` in this command:

```shell
npx hardhat verify --network ropsten DEPLOYED_CONTRACT_ADDRESS "Hello, Hardhat!"
```
