import styled from "styled-components";

export const Button = styled.button`
  border-radius: 1em;
  padding: 14px;
  cursor: pointer;
  background: rgba(130, 71, 229, 0.7);
  width: 100%;
  border: none;
  color: white;
  font-size: 1em;

  &:hover {
    background: white;
    color: black;
    transition: 0.5s;
  }
`;
