import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme';

import Maps from './Maps';

const locations = [
  {
    location: 'test',
    lat: '-66.5423',
    lng: '100.659'
  },
  {
    location: 'test2',
    lat: '66.5423',
    lng: '-100.659'
  }
];

it('renders Maps without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Maps />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('expects Maps google props to have the right value', () => {
  const wrapper = mount(<Maps google="56ea56as2h566S6d1asllp" />);
  expect(wrapper.props().google).toBe('56ea56as2h566S6d1asllp');
});

it('expects Maps to have locations props', () => {
  const wrapper = mount(<Maps locations={locations} />);
  expect(Object.keys(wrapper.props()).length).toBe(1);
});

it('expects Maps locations to have the same length of locations sent', () => {
  const wrapper = mount(<Maps locations={locations} />);
  expect(Object.keys(wrapper.props().locations).length).toBe(locations.length);
});
