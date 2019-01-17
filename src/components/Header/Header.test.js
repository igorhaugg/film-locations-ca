import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme';

import Header from './Header';

it('expects to render Header without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Header />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('expects to call a function on click', () => {
  const clickFunction = jest.fn();
  const headerComponent = shallow(
    <Header onClick={clickFunction} open={false} />
  );
  headerComponent.find('header').simulate('click');
  expect(clickFunction).toHaveBeenCalled();
});

it('expects Header to have only one child', () => {
  const headerComponent = mount(<Header open={false} />);
  const children = headerComponent.find('header').children();
  expect(children.length).toBe(1);
});

it('expects Header to have a span child', () => {
  const headerComponent = mount(<Header open={false} />);
  const children = headerComponent.find('header').children();
  expect(
    headerComponent
      .find('header')
      .children()
      .type()
  ).toBe('span');
});

it('expects Sidebar to not be open when sending `false`', () => {
  const headerComponent = mount(<Header open={false} />);
  const classes = headerComponent
    .find('header')
    .children()
    .props()
    .className.split(' ');
  expect(classes.length).toBe(1);
});

it('expects Sidebar to be open when sending `true`', () => {
  const headerComponent = mount(<Header open={true} />);
  const classes = headerComponent
    .find('header')
    .children()
    .props()
    .className.split(' ');
  expect(classes.length).toBe(2);
});
