import React from 'react';
import renderer from 'react-test-renderer';
import { GradientHeader } from '../../containers/GradientHeader';

test('renders correctly', () => {
  const tree = renderer.create(<GradientHeader />).toJSON();
  expect(tree).toMatchSnapshot();
});
