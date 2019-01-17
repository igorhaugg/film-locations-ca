import React from 'react';

import { css } from 'emotion';

const Header = ({ open, onClick }) => (
  <header className={toggle} onClick={() => onClick(open)}>
    <span className={open ? `${toggle__bars} ${toggle__on}` : toggle__bars} />
  </header>
);

const toggle = css`
  cursor: pointer;
  display: block;
  height: 3rem;
  margin-left: 1.4rem;
  padding-top: 2.8rem;
  position: relative;
  width: 3rem;
  z-index: 20;
`;

const toggle__bars = css`
  background-color: #282c34;
  border-radius: 2px;
  display: block;
  height: 5px;
  position: relative;
  transition: transform 0.5s;
  z-index: 20;
  width: 100%;
  &::after,
  &::before {
    background-color: #282c34;
    border-radius: 2px;
    content: '';
    height: 5px;
    left: 0;
    position: absolute;
    top: -9px;
    transition: transform 0.5s;
    width: 100%;
  }
  &::after {
    top: 9px;
  }
`;

const toggle__on = css`
  background-color: transparent;
  &::before {
    background-color: #f4f4f4;
    transform: rotate(45deg) translate(5px, 5px);
  }
  &::after {
    background-color: #f4f4f4;
    transform: rotate(-45deg) translate(7px, -8px);
  }
`;

export default Header;
