import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  Platform,
  Dimensions,
} from 'react-native';
import {TextInput} from 'react-native';

import {
  COLOR_BORDER,
  COLOR_GRAY_DARK,
  COLOR_LIGHT_DARK,
  COLOR_RED,
  themes,
} from '../constants/colors';
import images from '../assets/images';
import Styles from '../views/Styles';

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  iconWrap: {
    flex: 1,
    justifyContent: 'center',
  },
  icon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  textInput: {
    flex: 1,
    paddingHorizontal: 12,
    fontSize: 14,
    lineHeight: 16,
  },
  error: {
    fontFamily: 'Raleway',
    fontSize: 14,
    lineHeight: 16,
    color: COLOR_RED,
    marginTop: 4,
  },
  container: {
    width: '100%',
    borderRadius: 8,
    borderWidth: 1,
  },
  labelText: {
    fontFamily: 'Raleway',
    marginBottom: 8,
    marginLeft: 0,
    fontSize: 14,
    lineHeight: 16,
  },
});

const FloatingTextInput = props => {
  const {
    label,
    required,
    error,
    loading,
    secureTextEntry,
    containerStyle,
    inputRef,
    iconLeft,
    iconRight,
    inputStyle,
    wrapStyle,
    testID,
    placeholder,
    theme,
    outlineColor,
    backgroundColor,
    multiline,
    value,
    ...inputProps
  } = props;

  const [showPassword, setShowPassword] = useState(!secureTextEntry);

  return (
    <View style={{marginBottom: 16}}>
      <Text style={[styles.labelText, {color: themes[theme].normalTextColor}]}>
        {label}
      </Text>
      <View
        style={[
          styles.container,
          {
            borderColor: error ? COLOR_RED : themes[theme].borderColor,
          },
        ]}>
        <TextInput
          ref={inputRef}
          value={value}
          style={[
            styles.textInput,
            {
              backgroundColor: backgroundColor ?? 'transparent',
              color: themes[theme].activeTintColor,
              textAlignVertical: multiline ? 'top' : 'center',
              padding: multiline ? 12 : 6,
            },
          ]}
          outlineColor={error ? COLOR_RED : outlineColor || COLOR_BORDER}
          activeOutlineColor={error ? COLOR_RED : themes[theme].textColor}
          theme={{
            colors: {
              text: error ? COLOR_RED : themes[theme].activeTintColor,
            },
          }}
          secureTextEntry={!showPassword}
          placeholder={placeholder}
          placeholderTextColor={themes[theme].subTextColor}
          {...inputProps}
        />
      </View>
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
};

FloatingTextInput.defaultProps = {
  error: '',
};

export default FloatingTextInput;
