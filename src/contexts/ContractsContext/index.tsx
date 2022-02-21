import {
  FunctionComponent,
  createContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { ethers } from "ethers";
import {
  IContractsContext,
  MintDomain,
  Network,
  UpdateDomain,
  IRecord,
} from "src/types";
import { CONTRACT_ADDRESS } from "src/constants";
import DOMAINS from "src/artifacts/contracts/Domains.sol/Domains.json";
import { networks, mumbaiNetwork } from "src/utils/networks";

const { ethereum } = window;

export const ContractsContext = createContext<IContractsContext>({
  currentAccount: "",
  connectWallet: () => {
    return;
  },
  mintDomain: () => {
    return;
  },
  network: "0x89",
  switchNetwork: () => {
    return;
  },
  updateDomain: () => {
    return;
  },
  mints: [],
});

export const ContractsProvider: FunctionComponent = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState<string>("");
  const [network, setNetwork] = useState<string>("");
  const [mints, setMints] = useState<IRecord[]>([]);

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
    setNetwork(networks[chainId] || "");

    ethereum.on("chainChanged", handleChainChanged);

    function handleChainChanged(_chainId: Network | string) {
      window.location.reload();
    }

    fetchMints();
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

  const mintDomain: MintDomain = async ({
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

          tx = await contract.setRecord(domain, record);
          await tx.wait();

          console.log(
            "Record set! https://mumbai.polygonscan.com/tx/" + tx.hash
          );

          fetchMints();

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

  const switchNetwork = async () => {
    if (ethereum) {
      try {
        // Switch to the Mumbai testnet
        await ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: mumbaiNetwork.chainId }],
        });
      } catch (error: any) {
        // This error code means that the chain we want has not been added to MetaMask
        // In this case we ask the user to add it to their MetaMask
        if (error.code === 4902) {
          try {
            await ethereum.request({
              method: "wallet_addEthereumChain",
              params: [mumbaiNetwork],
            });
          } catch (error) {
            console.log(error);
          }
        }
        console.log(error);
      }
    } else {
      // If window.ethereum is not found then MetaMask is not installed
      alert(
        "MetaMask is not installed. Please install it to use this app: https://metamask.io/download.html"
      );
    }
  };

  const fetchMints = async () => {
    try {
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
          CONTRACT_ADDRESS,
          DOMAINS.abi,
          signer
        );

        const names: string[] = await contract.getAllNames();

        // For each name, gets the record and the address
        const mintRecords: IRecord[] = await Promise.all(
          names.map(async (name) => {
            const mintRecord = await contract.records(name);
            const owner = await contract.domains(name);
            return {
              id: names.indexOf(name),
              name: name,
              record: mintRecord,
              owner: owner,
            };
          })
        );

        console.log("MINTS FETCHED ", mintRecords);
        setMints(mintRecords);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateDomain: UpdateDomain = async ({
    record,
    domain,
    setIsLoading,
    setRecord,
    setDomain,
  }) => {
    if (!record || !domain) return;

    setIsLoading(true);
    console.log("Updating domain", domain, "with record", record);

    try {
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
          CONTRACT_ADDRESS,
          DOMAINS.abi,
          signer
        );

        const tx = await contract.setRecord(domain, record);
        await tx.wait();
        console.log("Record set https://mumbai.polygonscan.com/tx/" + tx.hash);

        fetchMints();
        setRecord("");
        setDomain("");
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, [checkIfWalletIsConnected]);

  return (
    <ContractsContext.Provider
      value={{
        currentAccount,
        connectWallet,
        mintDomain,
        network,
        switchNetwork,
        updateDomain,
        mints,
      }}
    >
      {children}
    </ContractsContext.Provider>
  );
};
