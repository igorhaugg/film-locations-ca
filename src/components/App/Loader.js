import React from 'react';
import { css } from 'emotion';
import { keyframes } from '@emotion/core';

const Loader = () => (
  <div className={loader}>
    <span className={loader__box}>
      <span className={loader__inner} />
    </span>
  </div>
);

const loader__animation = keyframes`
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

const loader__animationInner = keyframes`
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

const loader = css`
  align-items: center;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  height: 100%;
  justify-content: center;
  position: absolute;
  top: 0;
  width: 100%;
`;

const loader__box = css`
  animation: ${loader__animation} 2s infinite ease;
  border: 4px solid #fff;
  display: inline-block;
  height: 5rem;
  position: relative;
  width: 5rem;
`;

const loader__inner = css`
  animation: ${loader__animationInner} 2s infinite ease-in;
  background-color: #fff;
  display: inline-block;
  vertical-align: top;
  width: 100%;
`;

export default Loader;
