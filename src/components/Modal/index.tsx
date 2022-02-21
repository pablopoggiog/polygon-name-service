import { FunctionComponent } from "react";
import { Background, Container, Content } from "./styles";

interface ModalProps {
  content: string | JSX.Element;
  isOpen: boolean;
}

export const Modal: FunctionComponent<ModalProps> = ({ content, isOpen }) => {
  return (
    <Background isOpen={isOpen}>
      <Container>
        <Content> {content}</Content>
      </Container>
    </Background>
  );
};
