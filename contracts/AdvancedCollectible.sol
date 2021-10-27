// contracts/AdvancedCollectible.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract AdvancedCollectible is ERC721URIStorage, Ownable {
    bytes32 internal keyHash;
    uint256 public fee;
    uint256 public tokenCounter;
    string private baseUrl;
    mapping(bytes32 => address) public requestIdToSender;
    mapping(bytes32 => string) public requestIdToTokenURI;
    mapping(uint256 => Breed) public tokenIdToBreed;
    mapping(bytes32 => uint256) public requestIdToTokenId;

    enum Breed {
        PUG,
        SHIBA_INU,
        ST_BERNARD
    }

    event CequestedCollctible(bytes32 indexed requestId);

    constructor() ERC721("Dogie", "DOG") {
        tokenCounter = 0;
    }

    function createCollectible(string memory tokenURI)
        public
        returns (bytes32)
    {
        bytes32 requestId = convert(random());

        requestIdToSender[requestId] = msg.sender;
        requestIdToTokenURI[requestId] = tokenURI;

        emit CequestedCollctible(requestId);

        fulfillRandomness(requestId, random());

        return requestId;
    }

    function fulfillRandomness(bytes32 requestId, uint256 randomNumber)
        internal
    {
        address nftOwner = requestIdToSender[requestId];
        string memory tokenURI = requestIdToTokenURI[requestId];
        uint256 newItemId = tokenCounter;
        _safeMint(nftOwner, newItemId);
        _setTokenURI(newItemId, tokenURI);

        Breed breed = Breed(randomNumber % 3);
        tokenIdToBreed[newItemId] = breed;
        requestIdToTokenId[requestId] = newItemId;
        tokenCounter = tokenCounter + 1;
    }

    function random() private view returns (uint256) {
        return
            uint256(
                keccak256(abi.encodePacked(block.difficulty, block.timestamp))
            );
    }

    function convert(uint256 n) private pure returns (bytes32) {
        return bytes32(n);
    }

    function setTokenURI(uint256 tokenId, string memory _tokenURI) public {
        require(
            _isApprovedOrOwner(_msgSender(), tokenId),
            "ERC721: transfer caller is not owner nor approved"
        );
        _setTokenURI(tokenId, _tokenURI);
    }

    function setBaseURL(string memory _baseURL) external onlyOwner {
        baseUrl = _baseURL;
    }

    function _baseURI() internal view override returns (string memory) {
        return baseUrl;
    }
}
