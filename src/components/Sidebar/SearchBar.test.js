import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme';

import SearchBar from './SearchBar';

it('expects to render SearchBar without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<SearchBar />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('expects SearchBar to have a input text', () => {
  const wrapper = mount(<SearchBar />);
  const inputSearch = wrapper.find({ type: 'text' });
  expect(inputSearch.length).toBe(1);
});

it('expects SearchBar to have a button', () => {
  const wrapper = mount(<SearchBar />);
  const buttonSearch = wrapper.find('button');
  expect(buttonSearch.length).toBe(1);
});

it('expects SearchBar to have a small message', () => {
  const wrapper = mount(<SearchBar />);
  const message = wrapper.find('small');
  expect(message.type()).toBe('small');
});

it('expects SearchBar search props to have the right value', () => {
  const wrapper = mount(<SearchBar search="search value" />);
  expect(wrapper.props().search).toBe('search value');
});

it('expects SearchBar to have 4 props', () => {
  const wrapper = mount(
    <SearchBar
      handleChangeInput={() => {}}
      search="search values"
      check=""
      onClick={() => {}}
    />
  );
  expect(Object.keys(wrapper.props()).length).toBe(4);
});

it('expects to call function on click', () => {
  const clickFunction = jest.fn();
  const wrapper = shallow(<SearchBar onClick={clickFunction} />);
  wrapper.find('button').simulate('click');
  expect(clickFunction).toHaveBeenCalled();
});
