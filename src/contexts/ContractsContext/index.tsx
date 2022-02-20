import {
  FunctionComponent,
  createContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { ethers } from "ethers";
import { IContractsContext, IMintDomain, Network } from "src/types";
import DOMAINS from "src/artifacts/contracts/Domains.sol/Domains.json";
import { networks } from "src/utils/networks";

const { ethereum } = window;

// using String here not to enforce the type, but to avoid using "!" (the env vars could not exist, and the type of the contants would be string | undefined)
const CONTRACT_ADDRESS = String(process.env.REACT_APP_CONTRACT_ADDRESS);

export const ContractsContext = createContext<IContractsContext>({
  currentAccount: "",
  connectWallet: () => {
    return;
  },
  mintDomain: () => {
    return;
  },
  network: "0x89",
});

export const ContractsProvider: FunctionComponent = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState<string>("");
  const [network, setNetwork] = useState<string>("");

  const checkIfWalletIsConnected = useCallback(async () => {
    const accounts = await ethereum.request({
      method: "eth_accounts",
    });

    if (accounts.length !== 0) {
      const account = accounts[0];
      console.log("Found an authorized account:", account);
      setCurrentAccount(account);
    } else {
      console.log("No authorized account found");
    }

    const chainId: Network = await ethereum.request({
      method: "eth_chainId",
    });
    setNetwork(networks[chainId]);

    ethereum.on("chainChanged", handleChainChanged);

    function handleChainChanged(_chainId: Network) {
      window.location.reload();
    }
  }, []);

  const connectWallet = async () => {
    try {
      if (!ethereum) {
        alert("Get MetaMask -> https://metamask.io/");
        return;
      }

      // Fancy method to request access to account.
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      // Boom! This should print out public address once we authorize Metamask.
      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const mintDomain: IMintDomain = async ({
    domain,
    record,
    setRecord,
    setDomain,
  }) => {
    if (!domain) {
      return;
    }

    if (domain.length < 3) {
      alert("Domain must be at least 3 characters long");
      return;
    }

    const price =
      domain.length === 3 ? "0.5" : domain.length === 4 ? "0.3" : "0.1";
    console.log("Minting domain", domain, "with price", price);

    try {
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
          CONTRACT_ADDRESS,
          DOMAINS.abi,
          signer
        );

        console.log("Going to pop wallet now to pay gas...");

        let tx = await contract.register(domain, {
          value: ethers.utils.parseEther(price),
        });

        const receipt = await tx.wait();

        // Checks if the transaction was successfully completed
        if (receipt.status === 1) {
          console.log(
            "Domain minted! https://mumbai.polygonscan.com/tx/" + tx.hash
          );

          tx = contract.setRecord(domain, record);
          await tx.wait();

          console.log(
            "Record set! https://mumbai.polygonscan.com/tx/" + tx.hash
          );

          setRecord("");
          setDomain("");
        } else {
          alert("Transaction failed! Please try again");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, [checkIfWalletIsConnected]);

  return (
    <ContractsContext.Provider
      value={{ currentAccount, connectWallet, mintDomain, network }}
    >
      {children}
    </ContractsContext.Provider>
  );
};
