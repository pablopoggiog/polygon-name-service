import { FunctionComponent, useState } from "react";
import { useContracts } from "src/hooks";
import {
  Container,
  ButtonsContainer,
  Button,
  InputContainer,
  Input,
} from "./styles";

export const Form: FunctionComponent = () => {
  const [domain, setDomain] = useState<string>("");
  const [record, setRecord] = useState<string>("");

  return (
    <Container>
      <InputContainer>
        <Input
          type="text"
          value={domain}
          placeholder="domain"
          onChange={(e) => setDomain(e.target.value)}
        />
        <span> {".tld"} </span>
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
        <Button disabled={undefined} onClick={undefined}>
          Mint
        </Button>
        <Button disabled={undefined} onClick={undefined}>
          Set data
        </Button>
      </ButtonsContainer>
    </Container>
  );
};
