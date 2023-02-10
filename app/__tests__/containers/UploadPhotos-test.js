import React from 'react';
import renderer from 'react-test-renderer';
import UploadPhotos from '../../containers/UploadPhotos';

test('renders correctly', () => {
  const tree = renderer.create(<UploadPhotos value={[]} theme={'dark'}/>).toJSON();
  expect(tree).toMatchSnapshot();
});
