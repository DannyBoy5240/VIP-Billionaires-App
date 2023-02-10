import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import styles from './styles'
import { themes } from '../../constants/colors'
import { VectorIcon } from '../../containers/VectorIcon'

const Item = React.memo(
  ({ id, left, text, onPress, textStyle, theme, hasRight }) => {
    return (
      <TouchableOpacity
        key={id}
        onPress={onPress}
        style={[styles.container, {
          backgroundColor: themes[theme].buttonBackground,
        }]}>
        <View style={styles.item}>
          {left && (<View style={styles.itemLeft}>{left}</View>)}
          <View style={styles.itemCenter}>
            <Text style={[styles.itemText, { color: themes[theme].titleColor, ...textStyle }]}>
              {text}
            </Text>
          </View>
        </View>
        {hasRight && (
          <VectorIcon type="MaterialCommunityIcons" name="chevron-right" color={themes[theme].textColor} size={24} />
        )
        }
      </TouchableOpacity>
    )
  },
)

export default Item
