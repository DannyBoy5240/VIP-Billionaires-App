import React from 'react'
import { StyleSheet } from 'react-native'
import { SafeAreaView as SafeAreaContext } from 'react-native-safe-area-context'
import { withTheme } from '../theme'

const styles = StyleSheet.create({
  view: {
    flex: 1,
  },
})

const SafeAreaView = React.memo(
  ({ style, children, testID, theme, vertical = true, ...props }) => (
    <SafeAreaContext
      style={[styles.view, style]}
      edges={vertical ? ['right', 'left'] : undefined}
      testID={testID}
      {...props}>
      {children}
    </SafeAreaContext>
  ),
)

export default withTheme(SafeAreaView)
