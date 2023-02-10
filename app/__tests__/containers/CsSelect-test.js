import React from 'react';
import renderer from 'react-test-renderer';
import { render, screen, fireEvent } from '@testing-library/react-native';
import { CsSelect } from '../../containers/CsSelect';

test('renders correctly', () => {
  const tree = renderer.create(<CsSelect theme={'dark'}/>).toJSON();
  expect(tree).toMatchSnapshot();
});