import { useContracts } from "src/hooks";
import { Form } from "src/components";
import { Container, Header, Button } from "./styles";

const App = () => {
  const { connectWallet, currentAccount } = useContracts();

  return (
    <Container>
      <Header>🏇 Zed Run Name Service 🏇</Header>

      {currentAccount ? (
        <Form />
      ) : (
        <Button onClick={connectWallet}>Connect Wallet</Button>
      )}
    </Container>
  );
};

export default App;
