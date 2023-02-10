import React, { useState } from 'react'
import { View, StyleSheet, Text, TextInput, Image } from 'react-native'
import sharedStyles from '../views/Styles'
import { COLOR_DANGER, themes } from '../constants/colors'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { isIOS } from '../utils/deviceInfo'

const styles = StyleSheet.create({
  error: {
    ...sharedStyles.textAlignCenter,
    paddingTop: 5,
  },
  inputContainer: {
    marginBottom: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'grey',
  },
  label: {
    fontSize: 14,
    width: 80,
    paddingLeft: 8,
    paddingVertical: 4,
    ...sharedStyles.textSemibold,
  },
  required: {
    color: COLOR_DANGER,
    fontSize: 14,
    fontWeight: '700',
  },
  input: {
    ...sharedStyles.textRegular,
    fontSize: 16,
    paddingHorizontal: isIOS ? 8 : 14,
    paddingVertical: isIOS ? 10 : 4,
    flexGrow: 1,
    justifyContent: 'flex-start',
  },
  inputIconLeft: {
    paddingLeft: 54,
  },
  inputIconRight: {
    paddingRight: 45,
  },
  wrap: {
    flexDirection: 'row',
    alignItems: 'center',
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

const CsTextInput = props => {
  const [showPassword, setShowPassword] = useState(false)

  const {
    label,
    labelStyle,
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
    wrapStyle,
    testID,
    placeholder,
    theme,
    ...inputProps
  } = props

  const { dangerColor } = themes[theme]

  const leftIcon = () => {
    return (
      <View
        style={[
          styles.iconContainer,
          { backgroundColor: themes[theme].avatarBackground },
        ]}>
        <Image
          source={iconLeft}
          testID={testID ? `${testID}-icon-left` : null}
          style={[styles.iconLeft, { color: themes[theme].bodyText }]}
        />
      </View>
    )
  }

  const rightIcon = () => {
    const { iconRight, onIconRightPress, theme } = props
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
      <View style={[styles.wrap, wrapStyle]}>
        {label ? (
          <Text
            contentDescription={null}
            accessibilityLabel={null}
            style={[
              styles.label,
              { color: themes[theme].infoText },
              error.error && { color: dangerColor },
              labelStyle,
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

CsTextInput.defaultProps = {
  error: {},
  // theme: 'dark',
}
export default CsTextInput
