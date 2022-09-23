const { ethers } = require("hardhat");
const keccak256 = require("keccak256");
const { MerkleTree } = require("merkletreejs");

async function main() {
  const leaves = [
    "0x9965507D1a55bcC2695C58ba16FB37d819B0A4dc",
    "0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65",
    " 0x90F79bf6EB2c4f870365E785982E1f101E93b906",
    "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
    " 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92267",
  ].map((x) => keccak256(x));
  const tree = new MerkleTree(leaves, keccak256, { sortPairs: true });
  const buf2hex = (x) => "0x" + x.toString("hex");
  const root = buf2hex(tree.getRoot());
  console.log(`merkle root is ${root} `);
  /* A contract factory in ether.js is a abstraction used to deploy new smart contracts 
 so WhiteListContract here is a factory for instances of our Whitelist Contract*/

  const WhiteListContractFactory = await ethers.getContractFactory("MyToken");
  const deployedWhitelistContract = await WhiteListContractFactory.deploy(root);
  await deployedWhitelistContract.deployed();
  console.log(
    `deployed whitelist Contract at: ${deployedWhitelistContract.address}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
