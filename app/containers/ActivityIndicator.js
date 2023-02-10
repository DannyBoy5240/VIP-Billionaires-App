import React from 'react'
import { ActivityIndicator, StyleSheet } from 'react-native'
import { themes } from '../constants/colors'

const styles = StyleSheet.create({
  indicator: {
    padding: 16,
    flex: 1,
  },
  absolute: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100000,
  },
})

const RCActivityIndicator = ({ theme, absolute, ...props }) => (
  <ActivityIndicator
    style={[styles.indicator, absolute && styles.absolute]}
    color={themes[theme].activeTintColor}
    {...props}
  />
)
export default RCActivityIndicator
