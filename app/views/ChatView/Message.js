import React, { useContext } from 'react'
import { TouchableOpacity, View } from 'react-native'

import styles from './styles'
import Content from './Content'
import Time from './Time'

const MessageInner = React.memo(props => {
  const { isOwn } = props
  return (
    <>
      {isOwn ? (
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'flex-end',
            marginLeft: 96,
          }}>
          <Content {...props} />
        </View>
      ) : (
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'flex-start',
            marginRight: 96,
          }}>
          <Content {...props} />
        </View>
      )}
    </>
  )
})
MessageInner.displayName = 'MessageInner'

const Message = React.memo(props => {
  const { style } = props

  return (
    <View style={[styles.messageContainer, style]}>
      <MessageInner {...props} />
    </View>
  )
})
Message.displayName = 'Message'

const MessageTouchable = React.memo(({ item, onPressMedia, theme }) => {
  return <Message {...item} onPressMedia={onPressMedia} theme={theme} />
})
MessageTouchable.displayName = 'MessageTouchable'

export default MessageTouchable
