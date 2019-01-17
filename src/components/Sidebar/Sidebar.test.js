import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';

import Sidebar from './Sidebar';
import SearchBar from './SearchBar';

import checkboxes from '../../utils/checkboxes';

it('expects to render Sidebar without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Sidebar />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('expects Sidebar to have the same number of checkboxes', () => {
  const sidebarComponent = mount(<Sidebar />);
  const checkboxesSearch = sidebarComponent.find({ type: 'checkbox' });
  expect(checkboxesSearch.length).toBe(checkboxes.length);
});

it('expects Sidebar to have an input text', () => {
  const sidebarComponent = mount(<Sidebar />);
  const checkboxesSearch = sidebarComponent.find({ type: 'text' });
  expect(checkboxesSearch.length).toBe(1);
});

it('expects Sidebar to have SearchBar component', () => {
  const sidebarComponent = mount(<Sidebar />);
  const searchbar = sidebarComponent.find(SearchBar);
  expect(searchbar.length).toBe(1);
});

it('expects Sidebar to have SearchBar component with 2 children', () => {
  const sidebarComponent = mount(<Sidebar />);
  const children = sidebarComponent.find(SearchBar).children();
  expect(children.length).toBe(2);
});

it('expects Sidebar to have a title', () => {
  const sidebarComponent = mount(<Sidebar />);
  const title = sidebarComponent.find('h3');
  expect(title.type()).toBe('h3');
});

it('expects Sidebar to not be open when sending `false`', () => {
  const sidebarComponent = mount(<Sidebar open={false} />);
  const classes = sidebarComponent
    .find('aside')
    .props()
    .className.split(' ');
  expect(classes.length).toBe(1);
});

it('expects Sidebar to be open when sending `true`', () => {
  const sidebarComponent = mount(<Sidebar open={true} />);
  const classes = sidebarComponent
    .find('aside')
    .props()
    .className.split(' ');
  expect(classes.length).toBe(2);
});
