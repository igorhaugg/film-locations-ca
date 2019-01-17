import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';

import Loader from './Loader';

it('expects to render Loader without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Loader />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('expects Loader to have 2 span', () => {
  const loader = mount(<Loader />);
  const spanSearch = loader.find('span');
  expect(spanSearch.length).toBe(2);
});
