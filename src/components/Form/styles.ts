import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 3em;
  height: 100%;
  padding: 2rem;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1em;
  width: 100%;
`;

export const InputContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1em;
  background: black;
  border-radius: 8px;
  width: 100%;

  & > * {
    padding: 14px;
    font-size: 1em;
    color: white;
    background: black;
    border: none;
    border-radius: 8px;
  }
`;

export const Input = styled.input`
  width: 100%;
`;

export const SwitchNetwork = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  p {
    text-align: center;
  }
`;
