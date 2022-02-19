declare global {
  interface Window {
    ethereum?: any;
  }
}

export interface IContractsContext {
  currentAccount: string;
  connectWallet: () => void;
}
