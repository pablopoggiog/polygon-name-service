import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1em;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1em;
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
    padding: 10px;
    color: white;
    background: black;
    border: none;
    border-radius: 8px;
  }
`;

export const Button = styled.button`
  border-radius: 1em;
  padding: 0.6em;
  cursor: pointer;
`;

export const Input = styled.input`
  width: 100%;
`;
