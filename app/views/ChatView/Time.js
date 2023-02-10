import React from 'react'
import { StyleSheet, View, Text } from 'react-native'

import { withTheme } from '../../theme'
import moment from 'moment'

const styles = StyleSheet.create({
  timeContainer: {
    justifyContent: 'flex-end',
  },
  timeText: {
    fontSize: 12,
  },
})

const Time = React.memo(({ owner, isOwn, theme, createdAt, ...props }) => (
  <View style={styles.timeContainer}>
    <Text style={styles.timeText}>{moment(createdAt).format('LT')}</Text>
  </View>
))
Time.displayName = 'MessageTime'

export default withTheme(Time)
