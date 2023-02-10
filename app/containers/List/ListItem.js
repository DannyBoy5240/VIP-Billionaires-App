import React from 'react'
import { View, Text, StyleSheet, I18nManager } from 'react-native'
import Touch from '../../utils/touch'
import { themes } from '../../constants/colors'
import sharedStyles from '../../views/Styles'
import { withTheme } from '../../theme'
import I18n from '../../i18n'
import { Icon } from '.'
import { BASE_HEIGHT, PADDING_HORIZONTAL } from './constants'
import { withDimensions } from '../../dimensions'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: PADDING_HORIZONTAL,
  },
  leftContainer: {
    paddingRight: PADDING_HORIZONTAL,
  },
  rightContainer: {
    flexDirection: 'row',
    paddingLeft: PADDING_HORIZONTAL,
  },
  disabled: {
    opacity: 0.3,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    ...sharedStyles.textRegular,
  },
  subtitle: {
    fontSize: 14,
    ...sharedStyles.textRegular,
  },
  actionIndicator: {
    ...(I18nManager.isRTL ? { transform: [{ rotate: '180deg' }] } : {}),
  },
})

const Content = React.memo(
  ({
     title,
     subtitle,
     disabled,
     testID,
     left,
     right,
     color,
     theme,
     translateTitle,
     translateSubtitle,
     showActionIndicator,
     fontScale,
   }) => (
    <View
      style={[
        styles.container,
        disabled && styles.disabled,
        { height: BASE_HEIGHT * (fontScale ?? 1) },
      ]}
      testID={testID}>
      {left ? <View style={styles.leftContainer}>{left()}</View> : null}
      <View style={styles.textContainer}>
        <Text
          style={[styles.title, { color: color || themes[theme].titleText }]}
          numberOfLines={1}>
          {translateTitle ? I18n.t(title) : title}
        </Text>
        {subtitle ? (
          <Text
            style={[styles.subtitle, { color: themes[theme].auxiliaryText }]}
            numberOfLines={1}>
            {translateSubtitle ? I18n.t(subtitle) : subtitle}
          </Text>
        ) : null}
      </View>
      {right || showActionIndicator ? (
        <View style={styles.rightContainer}>
          {right ? right() : null}
          {showActionIndicator ? (
            <Icon name="chevron-right" style={styles.actionIndicator} />
          ) : null}
        </View>
      ) : null}
    </View>
  ),
)

const Button = React.memo(
  ({ onPress, backgroundColor, underlayColor, ...props }) => (
    <Touch
      onPress={() => onPress(props.title)}
      style={{
        backgroundColor: backgroundColor || themes[props.theme].backgroundColor,
      }}
      underlayColor={underlayColor}
      enabled={!props.disabled}
      theme={props.theme}>
      <Content {...props} />
    </Touch>
  ),
)

const ListItem = React.memo(({ ...props }) => {
  if (props.onPress) {
    return <Button {...props} />
  }
  return (
    <View
      style={{
        backgroundColor:
          props.backgroundColor || themes[props.theme].backgroundColor,
      }}>
      <Content {...props} />
    </View>
  )
})


ListItem.displayName = 'List.Item'

Content.defaultProps = {
  translateTitle: true,
  translateSubtitle: true,
  showActionIndicator: false,
}

Button.defaultProps = {
  disabled: false,
}

export default withTheme(withDimensions(ListItem))
