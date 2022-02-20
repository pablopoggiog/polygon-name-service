import { useContracts } from "src/hooks";
import { Form, Header, Button } from "src/components";
import { Container } from "./styles";

const App = () => {
  // const { connectWallet, currentAccount } = useContracts();

  return (
    <Container>
      <Header />
      <Form />
    </Container>
  );
};

export default App;
