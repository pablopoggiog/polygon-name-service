import { FunctionComponent, useState } from "react";
import { useContracts } from "src/hooks";
import { Button } from "src/components";
import { CONTRACT_ADDRESS, TLD } from "src/constants";
import {
  Container,
  FormBody,
  ButtonsContainer,
  InputContainer,
  Input,
  SwitchNetwork,
  DomainsContainer,
  Subtitle,
  DomainsList,
  Domain,
  Link,
  Name,
  Row,
} from "./styles";

export const Form: FunctionComponent = () => {
  const [domain, setDomain] = useState<string>("");
  const [record, setRecord] = useState<string>("");

  const {
    mintDomain,
    network,
    switchNetwork,
    currentAccount,
    connectWallet,
    mints,
  } = useContracts();

  const mint = () => {
    mintDomain({
      domain,
      record,
      setRecord,
      setDomain,
    });
  };

  return (
    <Container>
      <FormBody>
        {currentAccount ? (
          network !== "Polygon Mumbai Testnet" ? (
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
                <Button disabled={undefined} onClick={mint}>
                  Mint
                </Button>
              </ButtonsContainer>
            </>
          )
        ) : (
          <Button onClick={connectWallet}>Connect Wallet</Button>
        )}
      </FormBody>

      {currentAccount && mints.length > 0 && (
        <DomainsContainer>
          <Subtitle> Recently minted domains!</Subtitle>
          <DomainsList>
            {mints.map((mint, index) => (
              <Domain key={index}>
                <Row>
                  <Link
                    className="link"
                    href={`https://testnets.opensea.io/assets/mumbai/${CONTRACT_ADDRESS}/${mint.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Name>
                      {mint.name}.{TLD}
                    </Name>
                  </Link>
                </Row>
                <p> {mint.record} </p>
              </Domain>
            ))}
          </DomainsList>
        </DomainsContainer>
      )}
    </Container>
  );
};
