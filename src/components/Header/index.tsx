import { FunctionComponent } from "react";
import { useContracts } from "src/hooks";
import polygonLogo from "src/assets/polygonlogo.png";
import ethLogo from "src/assets/ethlogo.png";
import question from "src/assets/question.png";
import { Container, Title, Image, WalletStatus } from "./styles";

export const Header: FunctionComponent = () => {
  const { currentAccount, network } = useContracts();

  return (
    <Container>
      <Title>🏇 Zed Run Name Service 🏇</Title>
      <WalletStatus>
        <Image
          alt="Network logo"
          src={
            network.includes("Polygon")
              ? polygonLogo
              : network
              ? ethLogo
              : question
          }
        />
        {currentAccount ? (
          <p>
            {" "}
            Wallet: {currentAccount.slice(0, 6)}...
            {currentAccount.slice(-4)}{" "}
          </p>
        ) : (
          <p> Not connected </p>
        )}
      </WalletStatus>
    </Container>
  );
};
