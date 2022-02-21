import { FunctionComponent, useState } from "react";
import { useContracts } from "src/hooks";
import { Button, Spinner, Modal } from "src/components";
import { CONTRACT_ADDRESS, TLD } from "src/constants";
import editIcon from "src/assets/edit.png";
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
  Image,
  Row,
  EditButton,
} from "./styles";

export const Form: FunctionComponent = () => {
  const [domain, setDomain] = useState<string>("");
  const [record, setRecord] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const {
    mintDomain,
    network,
    switchNetwork,
    currentAccount,
    connectWallet,
    updateDomain,
    mints,
    isLoadingDomains,
  } = useContracts();

  const handleMint = () =>
    mintDomain({
      domain,
      record,
      setRecord,
      setDomain,
      setIsLoading,
    });

  const handleUpdateDomain = () =>
    updateDomain({
      domain,
      record,
      setRecord,
      setDomain,
      setIsLoading,
    });

  const editRecord = (name: string) => {
    console.log("Editing record for", name);
    setIsEditing(true);
    setDomain(name);
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
                {isEditing ? (
                  <>
                    <Button disabled={isLoading} onClick={handleUpdateDomain}>
                      {isLoading ? "Setting record" : "Set record"}
                    </Button>
                    <Button onClick={() => setIsEditing(false)}>Cancel</Button>
                  </>
                ) : (
                  <Button disabled={!domain || !record} onClick={handleMint}>
                    {isLoading ? "Minting" : "Mint"}
                  </Button>
                )}
              </ButtonsContainer>
            </>
          )
        ) : (
          <Button onClick={connectWallet}>Connect Wallet</Button>
        )}
      </FormBody>

      {isLoadingDomains && <Spinner />}

      {currentAccount && mints.length > 0 && (
        <DomainsContainer>
          <Subtitle> Recently minted domains!</Subtitle>
          <DomainsList>
            {mints.map(({ id, name, owner, record }) => (
              <Domain key={id}>
                <Row>
                  <Link
                    href={`https://testnets.opensea.io/assets/mumbai/${CONTRACT_ADDRESS}/${id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Name>
                      {name}.{TLD}
                    </Name>
                  </Link>
                  {/* Only editable being the owner */}
                  {owner.toLowerCase() === currentAccount.toLowerCase() && (
                    <EditButton onClick={() => editRecord(name)}>
                      <Image width="100%" src={editIcon} alt="Edit button" />
                    </EditButton>
                  )}
                </Row>
                <p> {record} </p>
              </Domain>
            ))}
          </DomainsList>
        </DomainsContainer>
      )}

      <Modal isOpen={isLoading} content={<Spinner />} />
    </Container>
  );
};
