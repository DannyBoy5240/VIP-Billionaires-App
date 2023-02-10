import React from 'react'
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native'
import { withTheme } from '../theme'

const styles = StyleSheet.create({
  view: {
    height: 44,
  },
})

const NavigationBar = React.memo(
  ({
     style,
     testID,
     theme,
     leftButton,
     leftButtonTextStyle,
     leftButtonText,
     leftButtonImage,
     leftButtonImageStyle,
     onLeftButtonClick,
     rightButton,
     rightButtonTextStyle,
     rightButtonText,
     rightButtonImage,
     rightButtonImageStyle,
     onRightButtonClick,
     ...props
   }) => {
    return (
      <View
        style={[styles.view, style]}
        testID={testID}
        {...props}>
      </View>
    )
  }
)

export default withTheme(NavigationBar)
