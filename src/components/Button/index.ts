import styled, { keyframes } from "styled-components";

const gradientAnimation = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
`;

export const Button = styled.button`
  border-radius: 1em;
  padding: 14px;
  cursor: pointer;
  background: -webkit-linear-gradient(left, #a200d6, rgba(130, 71, 229, 0.7));
  background-size: 200% 200%;
  width: 100%;
  border: none;
  color: linear-gradient(left, #a200d6, rgba(130, 71, 229, 0.7));
  color: white;
  font-size: 1em;
  animation: ${gradientAnimation} 4s ease infinite;
  transition: 0.5s;

  &:hover {
    transform: scale(1.02);
  }
`;
