import React from 'react'
import { StyleSheet, View, Text, Image, ActivityIndicator, TouchableOpacity } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'
import { COLOR_BLACK, COLOR_BTN_BACKGROUND, COLOR_BTN_BORDER, COLOR_WHITE, themes } from '../../constants/colors'
import images from '../../assets/images'
import { VectorIcon } from '../VectorIcon'

/* eslint-disable react-native/no-unused-styles */
const styles = StyleSheet.create({
  container: {
    borderRadius: 13,
    backgroundColor: COLOR_WHITE,
  },
  oauthButtonContainer: {
    margin: 8,
  },
  oauthBtn: {
    height: 40,
    resizeMode: 'contain',
  },
  buttonContainer: {
    borderRadius: 7,
    height: 45,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    borderWidth: 0.25,
  },
  icon: {
    position: 'absolute',
    left: 7.5,
    top: 7.5,
    width: 35,
    height: 35,
    resizeMode: 'contain',
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'Raleway',
    lineHeight: 18,
  },

  button_size_Z: {
    width: 335,
  },
  button_size_Y: {
    width: 201,
  },
  button_size_X: {
    width: 125,
  },
  button_size_W: {
    width: '100%',
  },
  button_size_V: {
    width: 125,
  },
  button_size_U: {
    width: 140,
  },
  button_size_T: {
    width: 313,
  },
  button_size_S: {
    width: 345,
  },
})

const Button = props => {
  const {
    title,
    text,
    icon,
    type,
    size,
    onPress,
    iconCenter,
    hidden,
    disabled,
    width,
    height,
    backgroundColor,
    loading,
    style,
    textColor: color,
    fontWeight,
    theme,
    iconColor,
    ...otherProps
  } = props

  if (hidden) {
    return null
  }

  if (type === 'oauth') {
    return (
      <RectButton onPress={onPress} style={styles.oauthButtonContainer}>
        <Image source={images[title]} style={styles.oauthBtn} />
      </RectButton>
    )
  }

  if (type === 'secondary') {
    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={(disabled || loading)}
        style={[
          styles.container,
          size ? styles[`button_size_${size}`] : {},
          style,
        ]}
        {...otherProps}>
        <View
          style={[
            styles.buttonContainer,
            size ? styles[`button_size_${size}`] : {},
            width ? { width } : {},
            height ? { height } : {},
            {
              opacity: disabled ? 0.5 : 1,
              borderWidth: 0.5,
              backgroundColor: COLOR_WHITE,
              borderColor: COLOR_BTN_BORDER,
            },
          ]}>
          {icon ? (
            <VectorIcon
              type="MaterialCommunityIcons" name={icon}
              size={24} style={{ marginRight: 8, ...iconColor }} />
          ) : null}
          {loading ? (
            <ActivityIndicator color={COLOR_BLACK} />
          ) : (
            <>
              <Text style={[styles.text, { color: disabled ? themes[theme].textColor : COLOR_BLACK }]}>
                {text || title}
              </Text>
            </>
          )}
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={(disabled || loading)}
      style={[
        styles.container,
        size ? styles[`button_size_${size}`] : {},
        style,
      ]}
      {...otherProps}>
      <View
        style={[
          styles.buttonContainer,
          size ? styles[`button_size_${size}`] : {},
          width ? { width } : {},
          height ? { height } : {},
          {
            backgroundColor: COLOR_BTN_BACKGROUND,
            borderColor: COLOR_BTN_BORDER,
          },
        ]}>
        {icon ? (
          <VectorIcon
            type="MaterialCommunityIcons" name={icon}
            size={24} style={{ marginRight: 8, ...iconColor }} />
        ) : null}
        {loading ? (
          <ActivityIndicator color={COLOR_WHITE} />
        ) : (
          <>
            <Text style={[styles.text, { color: disabled ? themes[theme].textColor : COLOR_WHITE }]}>
              {text || title}
            </Text>
          </>
        )}
      </View>
    </TouchableOpacity>
  )
}

Button.defaultProps = {
  title: 'Press me!',
  type: 'primary',
  size: 'Z',
  onPress: () => alert('It works!'),
  icon: null,
  hidden: false,
  disabled: false,
  loading: false,
}

export default Button
