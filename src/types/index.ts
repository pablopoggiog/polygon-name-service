import { networks } from "src/utils/networks";

declare global {
  interface Window {
    ethereum?: any;
  }
}

export interface IContractsContext {
  currentAccount: string;
  connectWallet: () => void;
  mintDomain: MintOrUpdateDomain;
  network: string;
  switchNetwork: () => void;
  updateDomain: MintOrUpdateDomain;
  mints: IRecord[];
  isLoadingDomains: boolean;
}

export type MintOrUpdateDomain = (params: {
  domain: string;
  record: string;
  setRecord: (record: string) => void;
  setDomain: (domain: string) => void;
  setIsLoading: (isLoading: boolean) => void;
}) => void;

export type Network = keyof typeof networks;

export interface IRecord {
  id: number;
  name: string;
  record: any;
  owner: any;
}
