import { useContracts } from "src/hooks";
import { Form, Header } from "src/components";
import { Container, Button } from "./styles";

const App = () => {
  const { connectWallet, currentAccount } = useContracts();

  return (
    <Container>
      <Header />
      {currentAccount ? (
        <Form />
      ) : (
        <Button onClick={connectWallet}>Connect Wallet</Button>
      )}
    </Container>
  );
};

export default App;
