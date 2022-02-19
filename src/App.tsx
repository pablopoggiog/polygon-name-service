import styled from "styled-components";
import { useContracts } from "src/hooks";

const App = () => {
  const { connectWallet, currentAccount } = useContracts();

  return (
    <Container>
      <Header>🏇 Zed Run Name Service 🏇</Header>

      {!currentAccount && (
        <Button onClick={connectWallet}>Connect Wallet</Button>
      )}
    </Container>
  );
};

export default App;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  background-color: #081018;
  color: white;
  align-items: center;
  justify-content: center;
`;

const Header = styled.h1`
  font-size: 2em;
  font-weight: 600;
`;

const Button = styled.button``;
