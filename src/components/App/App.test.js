import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';

import App from './App';
import Header from '../Header/Header';
import Maps from '../Maps/Maps';
import Sidebar from '../Sidebar/Sidebar';

const app = mount(<App />);

it('expects to render App without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('expects to render a div', () => {
  const divs = app.find('div');
  expect(divs.length).toBeGreaterThan(0);
});

it('expects to render a `Header` component', () => {
  expect(app.find(Header).length).toBe(1);
});

it('expects to render a `Maps` component', () => {
  expect(app.find(Maps).length).toBe(1);
});

it('expects to not render a `Sidebar` component initially', () => {
  expect(app.find(Sidebar).length).toBe(0);
});

it('expects to not receive any props', () => {
  const appComponent = app.find(App);
  expect(Object.keys(appComponent.props()).length).toBe(0);
});
