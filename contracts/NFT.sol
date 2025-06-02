// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NFTRewards is ERC721URIStorage, Ownable {
    uint256 public nextTokenId;
    mapping(address => uint256) public rewards;

    struct Investment {
        string coinName;
        uint256 amount;
        uint256 duration;
    }

    mapping(address => Investment[]) public investments;

    constructor(address initialOwner) ERC721("RewardNFT", "RNFT") Ownable(initialOwner) {}

    function mint(address to, string memory tokenURI) external onlyOwner {
        _safeMint(to, nextTokenId);
        _setTokenURI(nextTokenId, tokenURI);
        nextTokenId++;
    }

    function rewardUser(address user) external onlyOwner {
        rewards[user]++;
    }

    function claimReward(string memory tokenURI) external {
        require(rewards[msg.sender] > 0, "No rewards available");
        rewards[msg.sender]--;
        _safeMint(msg.sender, nextTokenId);
        _setTokenURI(nextTokenId, tokenURI);
        nextTokenId++;
    }

    function invest(string memory coinName, uint256 amount, uint256 duration) external {
        investments[msg.sender].push(Investment({
            coinName: coinName,
            amount: amount,
            duration: duration
        }));
    }

    function getInvestments(address user) external view returns (Investment[] memory) {
        return investments[user];
    }
}
