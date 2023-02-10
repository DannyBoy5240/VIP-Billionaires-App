import React, { useState } from 'react'
import { View, StyleSheet, Text, TextInput, Image } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import sharedStyles from '../views/Styles'
import {
  COLOR_DANGER,
  COLOR_YELLOW,
  themes,
} from '../constants/colors'
import { isIOS } from '../utils/deviceInfo'

const styles = StyleSheet.create({
  error: {
    ...sharedStyles.textAlignCenter,
    paddingTop: 5,
  },
  inputContainer: {
    marginBottom: 10,
  },
  label: {
    marginBottom: 4,
    fontSize: 14,
    ...sharedStyles.textSemibold,
  },
  required: {
    marginBottom: 10,
    color: COLOR_DANGER,
    fontSize: 14,
    fontWeight: '700',
  },
  input: {
    ...sharedStyles.textRegular,
    height: 48,
    fontSize: 16,
    paddingHorizontal: isIOS ? 8 : 14,
    borderWidth: 1,
    borderRadius: 24,
  },
  inputIconLeft: {
    paddingLeft: 54,
  },
  inputIconRight: {
    paddingRight: 45,
  },
  wrap: {
    position: 'relative',
    borderRadius: 24,
  },
  iconContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 48,
    height: 48,
    borderRadius: 24,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconLeft: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  iconRight: {
    right: 15,
  },
  icon: {
    color: '#2F343D',
  },
})

const RCTextInput = props => {
  const [showPassword, setShowPassword] = useState(false)

  const {
    label,
    left,
    required,
    error,
    loading,
    secureTextEntry,
    containerStyle,
    inputRef,
    iconLeft,
    iconRight,
    inputStyle,
    testID,
    placeholder,
    theme,
    onIconRightPress,
    ...inputProps
  } = props

  const { dangerColor } = themes[theme]

  const leftIcon = () => {
    return (
      <View style={[styles.iconContainer, { backgroundColor: COLOR_YELLOW }]}>
        <Image
          source={iconLeft}
          testID={testID ? `${testID}-icon-left` : null}
          style={[styles.iconLeft, { color: themes[theme].bodyText }]}
        />
      </View>
    )
  }

  const rightIcon = () => {
    return (
      <MaterialCommunityIcons
        name={iconRight.icon}
        style={{ color: themes[theme].bodyText }}
        size={18}
      />
    )
  }

  const tooglePassword = () => {
    setShowPassword(!showPassword)
  }

  return (
    <View style={[styles.inputContainer, containerStyle]}>
      {label ? (
        <Text
          contentDescription={null}
          accessibilityLabel={null}
          style={[
            styles.label,
            { color: themes[theme].titleText },
            error.error && { color: dangerColor },
          ]}>
          {label}
          {required ? (
            <Text
              contentDescription={null}
              accessibilityLabel={null}
              style={[styles.required, error.error]}>{` ${required}`}</Text>
          ) : null}
        </Text>
      ) : null}
      <View style={styles.wrap}>
        <TextInput
          style={[
            styles.input,
            iconLeft && styles.inputIconLeft,
            (secureTextEntry || iconRight) && styles.inputIconRight,
            {
              borderColor: themes[theme].separatorColor,
              color: themes[theme].titleText,
            },
            error.error && {
              color: dangerColor,
              borderColor: dangerColor,
            },
            inputStyle,
          ]}
          ref={inputRef}
          autoCorrect={false}
          autoCapitalize="none"
          underlineColorAndroid="transparent"
          secureTextEntry={secureTextEntry && !showPassword}
          testID={testID}
          accessibilityLabel={placeholder}
          placeholder={placeholder}
          contentDescription={placeholder}
          placeholderTextColor={themes[theme].auxiliaryText}
          theme={'light'}
          {...inputProps}
        />
        {iconLeft ? leftIcon() : null}
        {iconRight ? rightIcon() : null}
        {loading ? loading : null}
        {left}
      </View>
      {error && error.reason ? (
        <Text style={[styles.error, { color: dangerColor }]}>
          {error.reason}
        </Text>
      ) : null}
    </View>
  )
}

RCTextInput.defaultProps = {
  error: {},
  // theme: 'dark',
}

export default RCTextInput
