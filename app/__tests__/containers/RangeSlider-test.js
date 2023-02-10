import React from 'react';
import renderer from 'react-test-renderer';
import { render, screen, fireEvent } from '@testing-library/react-native';
import { RangeSlider } from '../../containers/RangeSlider';

test('renders correctly', () => {
  const tree = renderer.create(<RangeSlider min={0} max={100} step={2} initValue={{ low: 0, high: 100 }} theme={'dark'} style={[]}/>).toJSON();
  expect(tree).toMatchSnapshot();
});
