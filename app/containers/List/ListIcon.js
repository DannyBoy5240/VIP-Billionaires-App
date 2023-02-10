import React from 'react'
import { View, StyleSheet } from 'react-native'
import { themes } from '../../constants/colors'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { withTheme } from '../../theme'

const styles = StyleSheet.create({
  icon: {
    alignItems: 'center',
    justifyContent: 'center',
  },
})

const ListIcon = React.memo(({ theme, name, color, style }) => (
  <View style={[styles.icon, style]}>
    <Icon
      name={name}
      color={color ?? themes[theme].auxiliaryText}
      size={20}
    />
  </View>
))

ListIcon.displayName = 'List.Icon'

export default withTheme(ListIcon)
