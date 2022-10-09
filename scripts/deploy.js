const hre = require("hardhat");

async function main() {
  const BSCCharterNFT = await hre.ethers.getContractFactory("BSCCharterNFT");
  const charterNFT = await BSCCharterNFT.deploy();

  await charterNFT.deployed();

  console.log(
    `BSC Charter NFT deployed to: ${charterNFT.address}`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
