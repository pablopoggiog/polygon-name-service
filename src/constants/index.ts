// using String here not to enforce the type, but to avoid using "!" (the env vars could not exist, and the type of the contants would be string | undefined)
export const CONTRACT_ADDRESS = String(process.env.REACT_APP_CONTRACT_ADDRESS);

export const TLD = "zed";
