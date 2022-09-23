import Head from "next/head";
import styles from "../styles/Home.module.css";
import Web3Modal from "web3modal";
import { providers, Contract } from "ethers";
import { useEffect, useRef, useState } from "react";
import { NFT_CONTRACT_ADDRESS, abi } from "../constants";
import keccak256 from "keccak256";
import MerkleTree from "merkletreejs";

export default function Home() {
  // walletConnected keep track of whether the user's wallet is connected or not
  const [walletConnected, setWalletConnected] = useState(false);
  // verifyAccount keeps track of whether the current metamask address is eligible or not
  const [verifyAccount, setVerifyAccount] = useState(false);
  // mintStatus keeps track of wheather the user has minted the nft or not
  const [mintStatus, setMintStatus] = useState(false);
  // Create a reference to the Web3 Modal (used for connecting to Metamask) which persists as long as the page is open
  const web3ModalRef = useRef();

  const getProviderOrSigner = async (needSigner = false) => {
    // Connect to Metamask
    // Since we store `web3Modal` as a reference, we need to access the `current` value to get access to the underlying object
    const provider = await web3ModalRef.current.connect();
    const web3Provider = new providers.Web3Provider(provider);

    // If user is not connected to the Goerli network, let them know and throw an error
    const { chainId } = await web3Provider.getNetwork();
    if (chainId !== 5) {
      window.alert("Change the network to Goerli");
      throw new Error("Change network to Goerli");
    }

    if (needSigner) {
      const signer = web3Provider.getSigner();
      return signer;
    }
    return web3Provider;
  };

  const checkVerification = async () => {
    try {
      const signer = await getProviderOrSigner(true);
      // Create a new instance of the Contract with a Signer, which allows
      // update methods
      const nftContract = new Contract(NFT_CONTRACT_ADDRESS, abi, signer);
      console.log(nftContract);
      const address = await signer.getAddress();

      const addresses = [
        "0x9965507D1a55bcC2695C58ba16FB37d819B0A4dc",
        "0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65",
        " 0x90F79bf6EB2c4f870365E785982E1f101E93b906",
        "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
        " 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92267",
        "0xAF8E45a64eDbbc5f4556d6de8CF5566cD0109D45",
        "0xD29577917f30cf25C4c16881dA1C399dBE66445E",
      ];
      const leaves = addresses.map((x) => keccak256(x));

      const tree = new MerkleTree(leaves, keccak256, { sortPairs: true });

      const buf2hex = (x) => "0x" + x.toString("hex");

      const leaf = buf2hex(keccak256(address));

      const proof = tree.getProof(leaf).map((x) => buf2hex(x.data));

      const tx = await nftContract.isValid(proof, leaf);
      tx === true && setVerifyAccount((oldState) => !oldState);
      if (tx === false) alert("You Account is not WhiteListed");
    } catch (err) {
      console.error(err);
    }
  };

  const mintNFT = async () => {
    try {
      if (verifyAccount) {
        const signer = await getProviderOrSigner(true);

        const nftContract = new Contract(NFT_CONTRACT_ADDRESS, abi, signer);
        const address = await signer.getAddress();
        const addresses = [
          "0x9965507D1a55bcC2695C58ba16FB37d819B0A4dc",
          "0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65",
          " 0x90F79bf6EB2c4f870365E785982E1f101E93b906",
          "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
          " 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92267",
          "0xAF8E45a64eDbbc5f4556d6de8CF5566cD0109D45",
          "0xD29577917f30cf25C4c16881dA1C399dBE66445E",
        ];
        const leaves = addresses.map((x) => keccak256(x));

        const tree = new MerkleTree(leaves, keccak256, { sortPairs: true });

        const buf2hex = (x) => "0x" + x.toString("hex");

        const leaf = buf2hex(keccak256(address));

        const proof = tree.getProof(leaf).map((x) => buf2hex(x.data));

        const tx = await nftContract.safeMint(address, proof);

        setMintStatus((oldState) => !oldState);
      }
    } catch (err) {
      console.error(err);
    }
  };

  /*
    connectWallet: Connects the MetaMask wallet
  */
  const connectWallet = async () => {
    try {
      // Get the provider from web3Modal, which in our case is MetaMask

      await getProviderOrSigner();
      setWalletConnected(true);
      console.log("changed account");
    } catch (err) {
      console.error(err);
    }
  };

  const renderButton = () => {
    if (walletConnected) {
      if (verifyAccount) {
        return (
          <button onClick={checkVerification} className={styles.button}>
            Your Account is verified
          </button>
        );
      }
      return (
        <button onClick={checkVerification} className={styles.button}>
          Verify Your Account
        </button>
      );
    } else {
      return (
        <button onClick={connectWallet} className={styles.button}>
          Connect your wallet
        </button>
      );
    }
  };

  // In this case, whenever the value of `walletConnected` changes - this effect will be called
  useEffect(() => {
    // if wallet is not connected, create a new instance of Web3Modal and connect the MetaMask wallet
    if (!walletConnected) {
      // Assign the Web3Modal class to the reference object by setting it's `current` value
      // The `current` value is persisted throughout as long as this page is open
      web3ModalRef.current = new Web3Modal({
        network: "goerli",
        providerOptions: {},
        disableInjectedProvider: false,
      });
      connectWallet();
    }
  }, [walletConnected]);

  return (
    <div>
      <Head>
        <title>Merkle Tree NFT Whitelist Dapp</title>
        <meta name="description" content="Whitelist-Dapp" />
      </Head>
      <div className={styles.main}>
        <div>
          <h1 className={styles.title}>Merkle Tree NFT Whitelist Dapp!</h1>
          <div className={styles.description}>
            Its an NFT collection for developers in Crypto.
          </div>
          {renderButton()}
          {verifyAccount && (
            <div>
              <button onClick={mintNFT} className={styles.button}>
                Mint Your NFT
              </button>
            </div>
          )}
        </div>

        <div>
          <img className={styles.image} src="./crypto-devs.svg" />
        </div>
      </div>
      <div className={styles.mint}>
        {mintStatus && "You have successfully MINTED your NFT"}
      </div>
      <footer className={styles.footer}>Made with &#10084; by Aakash</footer>
    </div>
  );
}
