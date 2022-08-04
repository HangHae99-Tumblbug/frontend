import React from 'react';
import styled from 'styled-components';

export default function LoadingSpinner() {
  return (
    <SpinnerContainer>
      <div className="loading-spinner"></div>
    </SpinnerContainer>
  );
}

const SpinnerContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transform: -webkit-translate(-50%, -50%);
  transform: -moz-translate(-50%, -50%);
  transform: -ms-translate(-50%, -50%);
  /* display: grid;
  justify-content: center;
  align-items: center; */
  height: 350px;

  @keyframes spinner {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  .loading-spinner {
    width: 50px;
    height: 50px;
    border: 10px solid #f3f3f3; /* Light grey */
    border-top: 10px solid #383636; /* Blue */
    border-radius: 50%;
    animation: spinner 1.5s linear infinite;
  }
`;
