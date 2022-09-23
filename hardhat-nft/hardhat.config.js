require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
/** @type import('hardhat/config').HardhatUserConfig */
const GoerliApiKey = process.env.Goerli_Api_Key;
const GoerliPrivateKey = process.env.Goerli_Private_Key;
module.exports = {
  solidity: "0.8.4",
  networks: {
    goerli: {
      url: GoerliApiKey,
      accounts: [GoerliPrivateKey],
    },
  },
};
