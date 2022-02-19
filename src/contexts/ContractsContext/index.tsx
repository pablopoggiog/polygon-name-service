import { FunctionComponent, createContext, useState, useEffect } from "react";
import { ethers, Contract } from "ethers";
import { IContractsContext } from "src/types";
import Domains from "src/artifacts/contracts/Domains.sol/Domains.json";

// using String here not to enforce the type, but to avoid using "!" (the env vars could not exist, and the type of the contants would be string | undefined)
const tokenAddress = String(process.env.REACT_APP_TOKEN_ADDRESS);

export const ContractsContext = createContext<IContractsContext>({});

export const ContractsProvider: FunctionComponent = ({ children }) => {
  const [contractWithProvider, setContractWithProvider] = useState<Contract>();
  const [contractWithSigner, setContractWithSigner] = useState<Contract>();

  const requestAccount = async () => {
    await window.ethereum.request({ method: "eth_requestAccounts" });
  };

  const checkIfWalletIsConnected = () => {
    const { ethereum } = window;

    if (!ethereum) {
      console.log("Make sure you have MetaMask!");
      return;
    } else {
      console.log("We have the ethereum object", ethereum);
    }
  };

  const getContractAndSigner = async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contractWithProvider = new ethers.Contract(
          tokenAddress,
          Domains.abi,
          provider
        );
        const contractWithSigner = new ethers.Contract(
          tokenAddress,
          Domains.abi,
          signer
        );

        setContractWithProvider(contractWithProvider);
        setContractWithSigner(contractWithSigner);
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  useEffect(() => {
    getContractAndSigner();
  }, []);

  return (
    <ContractsContext.Provider value={{}}>{children}</ContractsContext.Provider>
  );
};
