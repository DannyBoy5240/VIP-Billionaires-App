import React, { useState } from 'react'
import { View, StyleSheet, TextInput, Text, TouchableOpacity } from 'react-native'
import sharedStyles from '../views/Styles'
import { withTheme } from '../theme'
import { themes, COLOR_TRANSPARENT, COLOR_GRAY_DARK } from '../constants/colors'
import { VectorIcon } from './VectorIcon'

const styles = StyleSheet.create({
  container: {
    borderStyle: 'solid',
    borderColor: COLOR_GRAY_DARK,
    borderWidth: 0.5,
    borderRadius: 14,
  },
  searchBox: {
    alignItems: 'center',
    borderRadius: 24,
    flexDirection: 'row',
    fontSize: 17,
    paddingHorizontal: 10,
    marginVertical: 4,
    marginHorizontal: 8,
  },
  input: {
    fontFamily: 'Hind Vadodara',
    height: 40,
    flex: 1,
    fontSize: 16,
    marginLeft: 8,
    paddingTop: 0,
    paddingBottom: 0,
    ...sharedStyles.textRegular,
  },
  cancel: {
    padding: 4,
  },
  cancelText: {
    ...sharedStyles.textRegular,
    fontSize: 17,
    backgroundColor: 'red',
  },
})

export const SearchBox = ({
  onChangeText,
  onSubmitEditing,
  testID,
  hasCancel,
  onCancelPress,
  inputRef,
  placeholder,
  theme,
  clearTextType,
  ...props
}) => {
  const [isShowClear, setShowClear] = useState(false)
  const [text, setText] = useState('')
  const onChangeTextInput = (_text) => {
    setText(_text)
    setShowClear(_text && _text.length > 0)
    onChangeText(_text)
  }
  const clear = () => {
    setText('')
    setShowClear(false)
    onChangeText('')
  }

  return (
    <View style={styles.container}>
      <View style={[styles.searchBox, { backgroundColor: COLOR_TRANSPARENT }]}>
        <VectorIcon
          name="search"
          type="Ionicons"
          size={18}
          color={themes[theme].subTextColor}
        />
        <TextInput
          ref={inputRef}
          value={text}
          autoCapitalize="none"
          autoCorrect={false}
          blurOnSubmit
          placeholder={placeholder ?? 'Search'}
          returnKeyType="search"
          style={[styles.input, { color: themes[theme].titleColor }]}
          testID={testID}
          underlineColorAndroid="transparent"
          onChangeText={onChangeTextInput}
          onSubmitEditing={onSubmitEditing}
          placeholderTextColor={themes[theme].textColor}
          theme={theme}
          {...props}
        />
        {
          isShowClear
            ? (<TouchableOpacity onPress={clear}>
                {
                  clearTextType
                    ? (<Text style={{ color: themes[theme].activeTintColor }}>Clear</Text>)
                    : (<VectorIcon name="close" type="Ionicons" size={18} color={themes[theme].activeTintColor} />)
                }
              </TouchableOpacity>
            ) : (<></>)
        }
      </View>
    </View>
  )
}

export default withTheme(SearchBox)
