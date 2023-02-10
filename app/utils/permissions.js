import { Alert, Platform } from 'react-native';
import {
  request,
  openSettings,
  PERMISSIONS,
  RESULTS,
} from 'react-native-permissions';
import I18n from '../i18n';
export const imagePickerConfig = {
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

export const backImagePickerConfig = {
  cropping: true,
  freeStyleCropEnabled: true,
  width: 1800,
  height: 1000,
  enableRotationGesture: true,
  avoidEmptySpaceAroundImage: false,
  cropperChooseText: I18n.t('Choose'),
  cropperCancelText: I18n.t('Cancel'),
  mediaType: 'photo',
};

export const videoPickerConfig = {
  mediaType: 'video',
  compressVideo: true,
  compressVideoPreset: 'MediumQuality',
};

export const libraryImagePickerConfig = {
  mediaType: 'photo',
};

export const libraryVideoPickerConfig = {
  mediaType: 'video',
  multiple: false,
  compressVideo: true,
  compressVideoPreset: 'MediumQuality',
};

const fetchCameraPermission = () => {
  return new Promise((resolve, reject) => {
    request(
      Platform.select({
        ios: PERMISSIONS.IOS.CAMERA,
        android: PERMISSIONS.ANDROID.CAMERA,
      }),
    )
      .then(result => {
        console.log('permission', result);
        if (result === RESULTS.GRANTED || result === RESULTS.LIMITED)
          resolve(true);
        else resolve(false);
      })
      .catch(error => {
        resolve(false);
      });
  });
};

const fetchPhotosPermission = () => {
  return new Promise((resolve, reject) => {
    request(
      Platform.select({
        ios: PERMISSIONS.IOS.PHOTO_LIBRARY,
        android: PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
      }),
    )
      .then(result => {
        console.log('permission', result);
        if (result === RESULTS.GRANTED || result === RESULTS.LIMITED)
          resolve(true);
        else resolve(false);
      })
      .catch(error => {
        resolve(false);
      });
  });
};

export const checkCameraPermission = async () => {
  if (!(await fetchCameraPermission())) {
    Alert.alert('Visit settings and allow camera permission', '', [
      {
        text: 'OK',
        onPress: () => {
          openSettings();
        },
      },
      {
        text: 'CANCEL',
        onPress: () => {},
      },
    ]);
    return false;
  }
  return true;
};

export const checkPhotosPermission = async () => {
  if (!(await fetchPhotosPermission())) {
    Alert.alert('Visit settings and allow photos permission', '', [
      {
        text: 'OK',
        onPress: () => {
          openSettings();
        },
      },
      {
        text: 'CANCEL',
        onPress: () => {},
      },
    ]);
    return false;
  }
  return true;
};
