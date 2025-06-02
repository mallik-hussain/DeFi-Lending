const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contract with the account:", deployer.address);

  const NFTRewards = await hre.ethers.getContractFactory("NFTRewards");
  const nft = await NFTRewards.deploy(deployer.address); // constructor expects an address

  // Wait for deployment to complete
  await nft.waitForDeployment(); // ✅ use this in Hardhat v2.20+ with ethers v6

  console.log("NFTRewards deployed to:", await nft.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
