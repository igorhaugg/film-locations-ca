import React, { Fragment } from 'react';

import { css } from 'emotion';

const SearchBar = ({ handleChangeInput, search, check, onClick }) => (
  <Fragment>
    <small className={searchbar__info}>
      Select in which fields you want to search.
    </small>
    <div className={searchbar__search}>
      <input
        type="text"
        className={searchbar__input}
        onChange={handleChangeInput}
        onKeyPress={e => {
          if (e.key === 'Enter') {
            onClick(search, check);
          }
        }}
        required
        autoFocus
      />
      <button
        className={searchbar__button}
        onClick={() => onClick(search, check)}
      >
        Search
      </button>
    </div>
  </Fragment>
);

const searchbar__button = css`
  background-color: #4d90fe;
  border: none;
  border-bottom-right-radius: 5px;
  border-top-right-radius: 5px;
  color: #f4f4f4;
  cursor: pointer;
  outline: none;
`;

const searchbar__search = css`
  display: flex;
  margin-top: 2rem;
`;

const searchbar__info = css`
  font-size: 1.4rem;
  font-weight: 100;
  margin-top: 1.5rem;
`;

const searchbar__input = css`
  border: 1px solid rgba(0, 0, 0, 0.5);
  font-size: 1.5rem;
  padding: 0.5rem;
  outline: none;
  width: 85%;
`;

export default SearchBar;
