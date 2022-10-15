# Merkle Tree NFT Whitelist Dapp!

Its an NFT project made for the Atom Dao Bounty and the simpler version of this is the winner of that bounty.
You can checkout the project [HERE](https://merkle-tree-nft-nft-next-app-24ao-nv193m2d0-mecskyverse.vercel.app)

Merkle-Tree NFT Whitelisting uses the ERC721 based contract to generate NFTs and Merkle Tree helps to keep the record of Whitelisted Address
### Setup The project at your system

``git clone https://github.com/mecskyverse/Merkle-Tree-NFT.git ``

Make sure You have NPM and NODEJS installed with their path setup

`` cd hardhat-nft 
npm install 
``
Here the hardhat project will install the dependencies 
now you can open the 
`` Scripts/deploy.js ``
You will See 
![image](https://user-images.githubusercontent.com/91150257/191967239-236b6b9e-17f9-4bc8-bdde-ecdf87c22923.png)

1. You can edit script or add account in leaves which you wanted to use in Merkle Tree 

2. Make a .env file in folder and add your account Private Key and API key 
```
Goerli_Api_Key =<api url>
Goerli_Private_Key =<Your private key>
```
3.Run
`` npx hardhat compile``

### If you have changed the leaves

`` npx hardhat run scripts/deploy.js --network rinkeby `` <br>
Take the ABI code from 
`` artifacts/contracts/MyToken.json`` 
and contract address from your terminal

paste in 
``nft-next-app/constants/index.js`` 

### If you haven't change the leaves in script

Run `` npx hardhat run scripts/deploy.js --network rinkeby ``

4. `` cd .. 
    cd nft-next-app ``
    
5. `` npm install ``

### If you have changed the leaves
GO TO `` NFT-whitelisting/nft-next-app/pages/index.js ``
![image](https://user-images.githubusercontent.com/91150257/191969983-01c98887-38f0-46b0-8fcd-52355e9a4476.png)

change the addresses variable in both  
mintNFT and checkVerification function 

then run `` npm run dev ``
and open your local host at port 3000

### If you haven't change the leaves in script
run
`` npm run dev ``
and open port 3000 of local host



## How to interact 
![image](https://user-images.githubusercontent.com/91150257/191973485-8a952d5e-2e6a-4320-8b44-5c0b5f6ff887.png)

1. Connect your metamast account
2. click on Veriry Account
3. If you have Account in the merkle tree Then
4. Account will verify and you will get a button to mint nft
![image](https://user-images.githubusercontent.com/91150257/191973724-06432925-357d-4b77-8b8c-d446a31e804a.png)
5. Click on Mint Nft 
6. Confirm the Transaction from your metamask extension
![image](https://user-images.githubusercontent.com/91150257/191974774-77149438-953d-43af-b14d-b4befe00ac74.png)

**And Congrats You have succesfully minted your NFT.**

