import React from 'react'
import styled, { css, keyframes } from 'styled-components';

const loaderKeyf = keyframes`
  0% {
    transform: rotate(0deg);
  }
  
  25% {
    transform: rotate(180deg);
  }
  
  50% {
    transform: rotate(180deg);
  }
  
  75% {
    transform: rotate(360deg);
  }
  
  100% {
    transform: rotate(360deg);
  }
`;

const loaderInnerKeyf = keyframes`
  0% {
    height: 0%;
  }
  
  25% {
    height: 0%;
  }
  
  50% {
    height: 100%;
  }
  
  75% {
    height: 100%;
  }
  
  100% {
    height: 0%;
  }
`;

const loaderAnim = css`
  ${loaderKeyf} 2s infinite alternate;
`;

const loaderInnerAnim = css`
  ${loaderInnerKeyf} 2s infinite alternate;
`;

const Loader = styled.span`
  display: inline-block;
  width: 30px;
  height: 30px;
  position: relative;
  border: 4px solid #48acee;
  top: 50%;  
  animation: ${loaderAnim};
`
const LoaderInner = styled.span`
  vertical-align: top;
  display: inline-block;
  width: 100%;
  background-color: #cecece;
  animation: ${loaderInnerAnim};
`
const Loading = () => (
  <Loader>
    <LoaderInner />  
  </Loader>
);

export default Loading