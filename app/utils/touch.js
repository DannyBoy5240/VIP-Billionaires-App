import React, { useEffect, useRef } from 'react'
import { RectButton } from 'react-native-gesture-handler'

import { themes } from '../constants/colors'

const Touch = props => {
  const { children, onPress, theme, underlayColor, ...otherProps } = props
  const buttonRef = useRef(null)

  useEffect(() => {
    // buttonRef.current.setNativeProps(props);
  }, [])

  return (
    <RectButton
      ref={ref => {buttonRef.current = ref}}
      onPress={onPress}
      activeOpacity={1}
      underlayColor={underlayColor || themes[theme].bannerBackground}
      rippleColor={themes[theme].bannerBackground}
      {...otherProps}>
      {children}
    </RectButton>
  )
}
export default Touch
