import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 3em;
  height: 100%;
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
    font-size: 16px;
    color: white;
    background: black;
    border: none;
    border-radius: 8px;
  }
`;

export const Button = styled.button`
  border-radius: 1em;
  padding: 14px;
  cursor: pointer;
  background: rgba(130, 71, 229, 0.7);
  width: 100%;
  border: none;
  color: white;
  font-size: 16px;

  &:hover {
    background: white;
    color: black;
    transition: 0.5s;
  }
`;

export const Input = styled.input`
  width: 100%;
`;
