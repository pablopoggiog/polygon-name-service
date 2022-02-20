import styled from "styled-components";

export const Container = styled.header`
  display: flex;
  width: 100%;
  background-color: #081018;
  color: white;
  align-items: center;
  justify-content: space-around;

  @media (max-width: 768px) {
    flex-direction: column;
    font-size: 0.7em;
  }

  @media (max-width: 500px) {
    font-size: 0.6em;
  }
`;

export const Title = styled.h1`
  font-size: 2em;
  font-weight: 600;
  display: flex;
  background: black;
  border-radius: 16px;
  padding: 12px 20px;
  margin-right: 10%;
  text-align: center;

  @media (max-width: 768px) {
    padding: 2rem;
    margin: 1rem;
  }
`;

export const WalletStatus = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  text-align: left;
  margin-left: 10%;

  @media (max-width: 768px) {
    padding: 2rem;
    margin: 1rem;
  }
`;

export const Image = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 10px;
`;
