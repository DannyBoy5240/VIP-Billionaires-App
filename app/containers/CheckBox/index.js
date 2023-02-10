import React from 'react'
import { Text, TouchableOpacity } from 'react-native'
import { COLOR_YELLOW } from '../../constants/colors'
import { VectorIcon } from '../VectorIcon'

const Index = React.memo(
  ({ title, checked, textStyle, containerStyle, onPress }) => (
    <TouchableOpacity
      style={{
        ...containerStyle,
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
      }}
      onPress={onPress}>
      <VectorIcon
        name={checked ? 'check-square-o' : 'square-o'}
        type={'FontAwesome'}
        size={24}
        color={checked ? COLOR_YELLOW : 'black'}
      />
      {title ? (
        <Text style={{ marginLeft: 8, ...textStyle }}>{title}</Text>
      ) : null}
    </TouchableOpacity>
  ),
)

export default Index
