import { FunctionComponent, useState } from "react";
import { useContracts } from "src/hooks";
import { Button } from "src/components";
import {
  Container,
  ButtonsContainer,
  InputContainer,
  Input,
  SwitchNetwork,
} from "./styles";

const TLD = "zed";

export const Form: FunctionComponent = () => {
  const [domain, setDomain] = useState<string>("");
  const [record, setRecord] = useState<string>("");

  const { mintDomain, network, switchNetwork } = useContracts();

  const onMint = () => {
    mintDomain({
      domain,
      record,
      setRecord,
      setDomain,
    });
  };

  return (
    <Container>
      {network !== "Polygon Mumbai Testnet" ? (
        <SwitchNetwork>
          <p>Please connect to the Polygon Mumbai Testnet</p>
          <Button onClick={switchNetwork}>Click here to switch</Button>
        </SwitchNetwork>
      ) : (
        <>
          <InputContainer>
            <Input
              type="text"
              maxLength={10}
              value={domain}
              placeholder="domain"
              onChange={(e) => setDomain(e.target.value)}
            />
            <span> .{TLD} </span>
          </InputContainer>

          <InputContainer>
            <Input
              type="text"
              maxLength={20}
              value={record}
              placeholder="what's ur zed power"
              onChange={(e) => setRecord(e.target.value)}
            />
          </InputContainer>

          <ButtonsContainer>
            <Button disabled={undefined} onClick={onMint}>
              Mint
            </Button>
          </ButtonsContainer>
        </>
      )}
    </Container>
  );
};
