import React from 'react'
import { KeyboardAwareScrollView } from '@codler/react-native-keyboard-aware-scroll-view'

import scrollPersistTaps from '../utils/scrollPersistTaps'

const KeyboardView = props => {
  const {
    style,
    contentContainerStyle,
    scrollEnabled,
    keyboardVerticalOffset,
    children,
  } = props

  return (
    <KeyboardAwareScrollView
      {...scrollPersistTaps}
      style={style}
      contentContainerStyle={contentContainerStyle}
      scrollEnabled={scrollEnabled}
      extraHeight={keyboardVerticalOffset}
      behavior="position">
      {children}
    </KeyboardAwareScrollView>
  )
}

export default KeyboardView
