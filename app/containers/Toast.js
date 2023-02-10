import React, {useRef, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import EasyToast from 'react-native-easy-toast';

import {themes} from '../constants/colors';
import sharedStyles from '../views/Styles';
import EventEmitter from '../utils/events';
import {withTheme} from '../theme';

const styles = StyleSheet.create({
  toast: {
    maxWidth: 300,
    padding: 10,
  },
  text: {
    fontSize: 14,
    ...sharedStyles.textRegular,
    ...sharedStyles.textAlignCenter,
  },
});

export const LISTENER = 'Toast';

const Toast = props => {
  const {theme} = props;
  const toast = useRef(null);
  useEffect(() => {
    EventEmitter.addEventListener(LISTENER, showToast);

    return () => {
      EventEmitter.removeListener(LISTENER);
    };
  }, []);

  useEffect(() => {
    // Geo
    // return true
  }, [props.theme]);

  const showToast = ({message}) => {
    if (toast.current && toast.current.show) {
      toast.current.show(message, 1000);
    }
  };

  return (
    <EasyToast
      ref={e => {
        toast.current = e;
      }}
      position="bottom"
      style={[styles.toast, {backgroundColor: themes[theme].toastBackground}]}
      textStyle={[styles.text, {color: themes[theme].actionColor}]}
      opacity={0.9}
    />
  );
};

export default withTheme(Toast);
