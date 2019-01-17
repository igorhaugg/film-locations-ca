import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme';

import Sidebar from './Sidebar';
import SearchBar from './SearchBar';

import checkboxes from '../../utils/checkboxes';

it('expects to render Sidebar without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Sidebar />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('expects Sidebar to have the same number of checkboxes', () => {
  const wrapper = mount(<Sidebar />);
  const checkboxesSearch = wrapper.find({ type: 'checkbox' });
  expect(checkboxesSearch.length).toBe(checkboxes.length);
});

it('expects Sidebar to have a input text', () => {
  const wrapper = mount(<Sidebar />);
  const checkboxesSearch = wrapper.find({ type: 'text' });
  expect(checkboxesSearch.length).toBe(1);
});

it('expects Sidebar to have SearchBar component', () => {
  const wrapper = mount(<Sidebar />);
  const searchbar = wrapper.find(SearchBar);
  expect(searchbar.length).toBe(1);
});

it('expects Sidebar to have SearchBar component with 2 children', () => {
  const wrapper = mount(<Sidebar />);
  const children = wrapper.find(SearchBar).children();
  expect(children.length).toBe(2);
});

it('expects Sidebar to have a title', () => {
  const wrapper = mount(<Sidebar />);
  const title = wrapper.find('h3');
  expect(title.type()).toBe('h3');
});

it('expects Sidebar to not be open when sending `false`', () => {
  const wrapper = mount(<Sidebar open={false} />);
  const classes = wrapper
    .find('aside')
    .props()
    .className.split(' ');
  expect(classes.length).toBe(1);
});

it('expects Sidebar to be open when sending `true`', () => {
  const wrapper = mount(<Sidebar open={true} />);
  const classes = wrapper
    .find('aside')
    .props()
    .className.split(' ');
  expect(classes.length).toBe(2);
});
