import React from 'react';
import renderer from 'react-test-renderer';
import { render, screen, fireEvent } from '@testing-library/react-native';
import CheckBox from '../../containers/CheckBox';

test('renders correctly', () => {
  const tree = renderer.create(<CheckBox />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('checkbox performance', () => {
  const mockFn = jest.fn();

  render(<CheckBox title="CHECKBOX" onPress={mockFn} />);
  expect(screen.getByText('CHECKBOX')).toBeTruthy();
  
  fireEvent.press(screen.getByText('CHECKBOX'));
  expect(mockFn).toBeCalledWith();
});