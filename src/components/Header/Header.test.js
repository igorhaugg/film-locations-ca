import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme';

import Header from './Header';

it('expects to render Header without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Header />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('expects to call function on click', () => {
  const clickFunction = jest.fn();
  const wrapper = shallow(<Header onClick={clickFunction} open={false} />);
  wrapper.find('header').simulate('click');
  expect(clickFunction).toHaveBeenCalled();
});

it('expects Header to have only one child', () => {
  const wrapper = mount(<Header open={false} />);
  const children = wrapper.find('header').children();
  expect(children.length).toBe(1);
});

it('expects Header to have a span child', () => {
  const wrapper = mount(<Header open={false} />);
  const children = wrapper.find('header').children();
  expect(
    wrapper
      .find('header')
      .children()
      .type()
  ).toBe('span');
});

it('expects Sidebar to not be open when sending `false`', () => {
  const wrapper = mount(<Header open={false} />);
  const classes = wrapper
    .find('header')
    .children()
    .props()
    .className.split(' ');
  expect(classes.length).toBe(1);
});

it('expects Sidebar to be open when sending `true`', () => {
  const wrapper = mount(<Header open={true} />);
  const classes = wrapper
    .find('header')
    .children()
    .props()
    .className.split(' ');
  expect(classes.length).toBe(2);
});
