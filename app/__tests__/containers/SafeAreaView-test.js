import React from 'react';
import renderer from 'react-test-renderer';
import SafeAreaView from '../../containers/SafeAreaView';

test('renders correctly', () => {
  const tree = renderer.create(<SafeAreaView />).toJSON();
  expect(tree).toMatchSnapshot();
});