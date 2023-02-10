import React from 'react'
import renderer from 'react-test-renderer'
import RCActivityIndicator from '../../containers/ActivityIndicator'

test('renders correctly', () => {
  const tree = renderer.create(<RCActivityIndicator styles={{}} theme={'dark'} absolute={true} />).toJSON()
  expect(tree).toMatchSnapshot()
})
