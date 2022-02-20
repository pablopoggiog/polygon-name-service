import { networks } from "src/utils/networks";

declare global {
  interface Window {
    ethereum?: any;
  }
}

export interface IContractsContext {
  currentAccount: string;
  connectWallet: () => void;
  mintDomain: IMintDomain;
  network: string;
  switchNetwork: () => void;
}

export type IMintDomain = (params: {
  domain: string;
  record: string;
  setRecord: (record: string) => void;
  setDomain: (domain: string) => void;
}) => void;

export type Network = keyof typeof networks;
