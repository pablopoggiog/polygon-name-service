import { useContext } from "react";
import { ContractsContext } from "src/contexts";

export const useContracts = () => useContext(ContractsContext);
