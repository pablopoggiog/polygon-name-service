import styled from "styled-components";

interface BackgroundProps {
  isOpen: boolean;
}

export const Background = styled.div<BackgroundProps>`
  background: rgba(0, 0, 0, 0.7);
  position: fixed;
  bottom: 0;
  top: 0;
  right: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 90;
  display: ${({ isOpen }) => (isOpen ? "flex" : "none")};
  align-items: center;
  justify-content: center;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  color: white;
  border-radius: 5px;
  width: 80%;
  max-width: 500px;
  padding: 1em 1.4em;
  word-break: break-word;
`;

export const Content = styled.div`
  padding: 1em;
`;
