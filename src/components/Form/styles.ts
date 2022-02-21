import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  gap: 3em;
  height: 100%;
  padding: 2rem;
  width: 100%;
  box-sizing: border-box;
`;

export const FormBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 3em;
  padding: 2rem;
  max-width: 310px;
  box-sizing: border-box;
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

//  Domains

export const DomainsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
`;

export const Subtitle = styled.p`
  text-align: center;
`;

export const DomainsList = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2em;
  flex-wrap: wrap;
  padding: 2em 0;
`;

export const Domain = styled.div`
  min-width: 115px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: rgba(130, 71, 229, 0.4);
  border-radius: 7px;
  padding: 0.8em;
`;

export const Row = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1em;
  width: 100%;
`;

export const Link = styled.a`
  color: white !important;
`;

export const Name = styled.p``;

export const Image = styled.img``;

export const EditButton = styled.button`
  height: 30px;
  width: 30px;
  border-radius: 7px;
  background: transparent;
  border: none;
  cursor: pointer;
  transition: 0.5s;

  &:hover {
    transform: scale(1.02);
  }
`;
