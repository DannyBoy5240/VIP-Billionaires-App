import { Alert } from 'react-native';
import { LISTENER } from '../containers/Toast';
import EventEmitter from '../utils/events';
import I18n from '../i18n';

export const showErrorAlert = (message, title, onPress = () => {}) =>
  Alert.alert(title, message, [{ text: I18n.t('OK'), onPress }], {
    cancelable: true,
  });

export const showToast = message =>
  EventEmitter.emit(LISTENER, { message: message });

export const showConfirmationAlert = ({
  title,
  message,
  callToAction,
  onPress,
}) =>
  Alert.alert(
    title ?? 'Are you sure question mark',
    message,
    [
      {
        text: I18n.t('Cancel'),
        style: 'cancel',
      },
      {
        text: callToAction,
        style: 'destructive',
        onPress,
      },
    ],
    { cancelable: false },
  );
