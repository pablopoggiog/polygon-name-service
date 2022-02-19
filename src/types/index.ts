declare global {
  interface Window {
    ethereum?: any;
  }
}

export interface IContractsContext {
  currentAccount: string;
  connectWallet: () => void;
  mintDomain: IMintDomain;
}

export type IMintDomain = (params: {
  domain: string;
  record: string;
  setRecord: (record: string) => void;
  setDomain: (domain: string) => void;
}) => void;
