import {
  FunctionComponent,
  createContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { ethers, Contract } from "ethers";
import { IContractsContext } from "src/types";
import Domains from "src/artifacts/contracts/Domains.sol/Domains.json";

const { ethereum } = window;

// using String here not to enforce the type, but to avoid using "!" (the env vars could not exist, and the type of the contants would be string | undefined)
const contractAddress = String(process.env.REACT_APP_CONTRACT_ADDRESS);

export const ContractsContext = createContext<IContractsContext>({
  currentAccount: "",
  connectWallet: () => {
    return;
  },
});

export const ContractsProvider: FunctionComponent = ({ children }) => {
  const [contractWithProvider, setContractWithProvider] = useState<Contract>();
  const [contractWithSigner, setContractWithSigner] = useState<Contract>();
  const [currentAccount, setCurrentAccount] = useState<string>("");

  const checkIfWalletIsConnected = useCallback(async () => {
    const accounts = await ethereum.request({
      method: "eth_accounts",
    });
    // Users can have multiple authorized accounts, we grab the first one if its there!
    if (accounts.length !== 0) {
      const account = accounts[0];
      console.log("Found an authorized account:", account);
      setCurrentAccount(account);
    } else {
      console.log("No authorized account found");
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

  const getContractAndSigner = async () => {
    if (ethereum) {
      try {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const contractWithProvider = new ethers.Contract(
          contractAddress,
          Domains.abi,
          provider
        );
        const contractWithSigner = new ethers.Contract(
          contractAddress,
          Domains.abi,
          signer
        );
        console.log({ contractWithProvider, contractWithSigner });
        setContractWithProvider(contractWithProvider);
        setContractWithSigner(contractWithSigner);
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, [checkIfWalletIsConnected]);

  // useEffect(() => {
  //   getContractAndSigner();
  // }, []);

  return (
    <ContractsContext.Provider value={{ currentAccount, connectWallet }}>
      {children}
    </ContractsContext.Provider>
  );
};
