import React from 'react';
import renderer from 'react-test-renderer';
import { StatusBar } from '../../containers/StatusBar';

test('renders correctly', () => {
  const tree = renderer.create(<StatusBar theme={'dark'}/>).toJSON();
  expect(tree).toMatchSnapshot();
});
