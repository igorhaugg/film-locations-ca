import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';

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
  const mapsComponent = mount(<Maps google="56ea56as2h566S6d1asllp" />);
  expect(mapsComponent.props().google).toBe('56ea56as2h566S6d1asllp');
});

it('expects Maps to have locations props', () => {
  const mapsComponent = mount(<Maps locations={locations} />);
  expect(Object.keys(mapsComponent.props()).length).toBe(1);
});

it('expects Maps locations to have the same length of locations sent', () => {
  const mapsComponent = mount(<Maps locations={locations} />);
  expect(Object.keys(mapsComponent.props().locations).length).toBe(
    locations.length
  );
});
