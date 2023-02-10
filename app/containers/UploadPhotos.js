import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import { themes } from '../constants/colors';
import images from '../assets/images';
import {
  checkCameraPermission,
  checkPhotosPermission,
} from '../utils/permissions';
import I18n from '../i18n';

const imagePickerConfig = {
  cropping: true,
  freeStyleCropEnabled: true,
  width: 1200,
  height: 1500,
  enableRotationGesture: true,
  avoidEmptySpaceAroundImage: false,
  cropperChooseText: I18n.t('Choose'),
  cropperCancelText: I18n.t('Cancel'),
  mediaType: 'photo',
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 4,
    borderWidth: 1,
    padding: 8,
  },
  titleText: {
    marginBottom: 8,
  },
  btnContainer: {
    borderWidth: 1,
    borderStyle: 'dashed',
  },
  btnText: {
    paddingVertical: 8,
    textAlign: 'center',
  },
  photos: {
    flexDirection: 'row',
    marginVertical: 8,
  },
  photoContainer: {
    position: 'relative',
    marginRight: 12,
  },
  closeContainer: {
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 10,
  },
  closeIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  image: {
    width: 72,
    height: 72,
  },
});

const UploadPhotos = React.memo(({ value, onChangePhotos, maxCount, theme }) => {
  const [photos, setPhotos] = useState(value);
  const takePhoto = async () => {
    if (await checkCameraPermission()) {
      ImagePicker.openCamera(imagePickerConfig).then(image => {
        let updatePhotos = [...photos, image.path];
        setPhotos(updatePhotos);
        onChangePhotos(updatePhotos);
      });
    }
  };

  const chooseFromLibrary = async () => {
    if (await checkPhotosPermission()) {
      ImagePicker.openPicker(imagePickerConfig).then(image => {
        let updatePhotos = [...photos, image.path];
        setPhotos(updatePhotos);
        onChangePhotos(updatePhotos);
      });
    }
  };

  const onPress = () => {
    if (photos.length >= maxCount) {
      return;
    }
    Alert.alert('', 'Upload Photo', [
      {
        text: 'CANCEL',
        onPress: () => {},
      },
      {
        text: 'TAKE A PHOTO',
        onPress: () => {
          takePhoto();
        },
      },
      {
        text: 'FROM GALLERY',
        onPress: () => {
          chooseFromLibrary();
        },
      },
    ]);
  };

  const onRemovePhoto = index => {
    let updatePhotos = [...photos];
    updatePhotos.splice(index, 1);
    setPhotos(updatePhotos);
    onChangePhotos(updatePhotos);
  };

  return (
    <View
      style={[styles.container, { borderColor: themes[theme].separatorColor }]}>
      <Text style={styles.titleText}>Upload Photos</Text>
      <View style={styles.photos}>
        {photos.map((p, index) => (
          <View style={styles.photoContainer}>
            <TouchableOpacity
              style={styles.closeContainer}
              onPress={() => onRemovePhoto(index)}>
              <Image source={images.ic_close} style={styles.closeIcon} />
            </TouchableOpacity>
            <Image source={{ uri: p }} style={styles.image} />
          </View>
        ))}
      </View>
      <TouchableOpacity style={styles.btnContainer} onPress={onPress}>
        <Text style={styles.btnText}>Tap to Upload Photos</Text>
      </TouchableOpacity>
    </View>
  );
});

export default UploadPhotos;
