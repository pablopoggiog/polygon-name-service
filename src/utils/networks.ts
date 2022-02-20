const networks = {
  "0x1": "Mainnet",
  "0x3": "Ropsten",
  "0x2a": "Kovan",
  "0x4": "Rinkeby",
  "0x5": "Goerli",
  "0x61": "BSC Testnet",
  "0x38": "BSC Mainnet",
  "0x89": "Polygon Mainnet",
  "0x13881": "Polygon Mumbai Testnet",
  "0xa86a": "AVAX Mainnet",
};

export const mumbaiNetwork = {
  chainId: "0x13881",
  chainName: "Polygon Mumbai Testnet",
  rpcUrls: ["https://rpc-mumbai.maticvigil.com/"],
  nativeCurrency: {
    name: "Mumbai Matic",
    symbol: "MATIC",
    decimals: 18,
  },
  blockExplorerUrls: ["https://mumbai.polygonscan.com/"],
};

export { networks };
