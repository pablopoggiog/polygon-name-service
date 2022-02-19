import { FunctionComponent, useState } from "react";
import { useContracts } from "src/hooks";
import {
  Container,
  ButtonsContainer,
  Button,
  InputContainer,
  Input,
} from "./styles";

const TLD = "zed";

export const Form: FunctionComponent = () => {
  const [domain, setDomain] = useState<string>("");
  const [record, setRecord] = useState<string>("");

  const { mintDomain } = useContracts();

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
      <InputContainer>
        <Input
          type="text"
          value={domain}
          placeholder="domain"
          onChange={(e) => setDomain(e.target.value)}
        />
        <span> .{TLD} </span>
      </InputContainer>

      <InputContainer>
        <Input
          type="text"
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
    </Container>
  );
};
