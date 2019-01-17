import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';

import SearchBar from './SearchBar';

it('expects to render SearchBar without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<SearchBar />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('expects SearchBar to have an input text', () => {
  const searchbarComponent = mount(<SearchBar />);
  const inputSearch = searchbarComponent.find({ type: 'text' });
  expect(inputSearch.length).toBe(1);
});

it('expects SearchBar to have a button', () => {
  const searchbarComponent = mount(<SearchBar />);
  const buttonSearch = searchbarComponent.find('button');
  expect(buttonSearch.length).toBe(1);
});

it('expects SearchBar to have a small message', () => {
  const searchbarComponent = mount(<SearchBar />);
  const message = searchbarComponent.find('small');
  expect(message.type()).toBe('small');
});

it('expects SearchBar search props to have the right value', () => {
  const searchbarComponent = mount(<SearchBar search="search value" />);
  expect(searchbarComponent.props().search).toBe('search value');
});

it('expects SearchBar to have 4 props', () => {
  const searchbarComponent = mount(
    <SearchBar
      handleChangeInput={() => {}}
      search="search values"
      check=""
      onClick={() => {}}
    />
  );
  expect(Object.keys(searchbarComponent.props()).length).toBe(4);
});

it('expects to call a function on click', () => {
  const clickFunction = jest.fn();
  const searchbarComponent = mount(<SearchBar onClick={clickFunction} />);
  searchbarComponent.find('button').simulate('click');
  expect(clickFunction).toHaveBeenCalled();
});
