import styled from "styled-components";

export const Container = styled.header`
  display: flex;
  width: 100%;
  background-color: #081018;
  color: white;
  align-items: center;
  justify-content: space-around;
`;

export const Title = styled.h1`
  font-size: 2em;
  font-weight: 600;
  display: flex;
  background: black;
  border-radius: 16px;
  padding: 12px 20px;
  margin-right: 10%;
`;

export const WalletStatus = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  text-align: left;
  margin-left: 10%;
`;

export const Image = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 10px;
`;
