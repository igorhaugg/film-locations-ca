import React, { Component } from 'react';

import { css } from 'emotion';

import SearchBar from './SearchBar';
import checkboxes from '../../utils/checkboxes';

class Sidebar extends Component {
  state = {
    search: '',
    checkboxes: checkboxes
  };
  handleChangeInput = e => {
    this.setState({ search: e.target.value });
  };
  handleChangeCheckbox = (item, index, state) => {
    const currentState = { ...state };
    const checkboxes = [...currentState.checkboxes];
    checkboxes[index].checked = !checkboxes[index].checked;
    this.setState({ checkboxes: checkboxes });
  };
  render() {
    const { open, onClick } = this.props;
    const { search, checkboxes } = this.state;
    const check = checkboxes.filter(item => item.checked);
    return (
      <aside className={open ? `${sidebar} ${sidebar__on}` : sidebar}>
        <h3 className={sidebar__title}>Film locations in San Francisco</h3>
        {checkboxes.map((item, index) => (
          <div key={item.name}>
            <input
              id={item.name}
              type="checkbox"
              value={item.name}
              onChange={() =>
                this.handleChangeCheckbox(item, index, this.state)
              }
              checked={item.checked}
            />
            <label htmlFor={item.name}>{item.title}</label>
          </div>
        ))}
        <SearchBar
          handleChangeInput={this.handleChangeInput}
          search={search}
          check={check}
          onClick={onClick}
        />
      </aside>
    );
  }
}
const sidebar = css`
  background: linear-gradient(to right, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.9));
  color: #f4f4f4;
  display: flex;
  flex-direction: column;
  font-size: 2rem;
  min-height: 100vh;
  padding: 3rem 2rem;
  position: absolute;
  transform: translateX(-100vw);
  transition: transform 0.5s;
  top: 0;
  width: 30rem;
  z-index: 10;
  & > div {
    padding: 0.2rem 0;
  }
`;

const sidebar__on = css`
  transform: translateX(0);
`;

const sidebar__title = css`
  font-size: 1.8rem;
  font-weight: 100;
  margin-top: 2.5rem;
  text-align: center;
`;

export default Sidebar;
