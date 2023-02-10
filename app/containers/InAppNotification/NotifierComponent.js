import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { connect } from 'react-redux'
import { Notifier } from 'react-native-notifier'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

// import Avatar from '../Avatar';
// import {CustomIcon} from '../../lib/Icons';
import sharedStyles from '../../views/Styles'
import { themes } from '../../constants/colors'
import { useTheme } from '../../theme'
import { useOrientation } from '../../dimensions'

const AVATAR_SIZE = 48
const BUTTON_HIT_SLOP = {
  top: 12,
  right: 12,
  bottom: 12,
  left: 12,
}

const styles = StyleSheet.create({
  container: {
    height: 75,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 4,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inner: {
    flex: 1,
  },
  avatar: {
    marginRight: 10,
  },
  roomName: {
    fontSize: 17,
    lineHeight: 20,
    ...sharedStyles.textMedium,
  },
  message: {
    fontSize: 14,
    lineHeight: 17,
    ...sharedStyles.textRegular,
  },
  close: {
    marginLeft: 10,
  },
  small: {
    width: '50%',
    alignSelf: 'center',
  },
  ring: {
    width: 0,
    height: 0,
  },
})

const NotifierComponent = React.memo(
  ({ notification, isMasterDetail, duration, customEmojis }) => {
    const { theme } = useTheme()
    const insets = useSafeAreaInsets()
    const { isLandscape } = useOrientation()
    const [text, setText] = useState('')
    // const [ pause, setPause ] = useState(true);

    const { text: message, payload, room, avatar } = notification
    const { rid, type } = payload
    // if sub is not on local database, title and avatar will be null, so we use payload from notification
    const { title = type === 'd' ? payload.sender.username : payload.name } =
      notification

    useEffect(() => {
      let text = message
      setText(text)
      // setTimeout(() => { setPause(true)}, duration);
    }, [payload, message, duration])

    const onPress = () => {
      const { rid, message } = payload
      if (!rid) {
        return
      }
    }

    const hideNotification = () => {
      // setPause(true);
      Notifier.hideNotification()
    }

    return (
      <View
        style={[
          styles.container,
          (isMasterDetail || isLandscape) && styles.small,
          {
            backgroundColor: themes[theme].focusedBackground,
            borderColor: themes[theme].separatorColor,
            marginTop: insets.top,
          },
        ]}>
        <TouchableOpacity
          style={styles.content}
          onPress={onPress}
          hitSlop={BUTTON_HIT_SLOP}
          background={Touchable.SelectableBackgroundBorderless()}>
          <>
            {/*<Avatar text={avatar} size={AVATAR_SIZE} borderRadius={AVATAR_SIZE/2} type={type} rid={rid} style={styles.avatar} />*/}
            <View style={styles.inner}>
              <Text
                style={[styles.roomName, { color: themes[theme].titleText }]}
                numberOfLines={1}>
                {title}
              </Text>
              <Text
                style={[styles.message, { color: themes[theme].titleText }]}
                numberOfLines={1}>
                {text}
              </Text>
            </View>
            {/*<View style={styles.ring}>*/}
            {/*	<Video*/}
            {/*		ref={this.setRef}*/}
            {/*		source={require('./ring.mp3')}*/}
            {/*		paused={pause}*/}
            {/*		repeat={true}*/}
            {/*	/>*/}
            {/*</View>*/}
          </>
        </TouchableOpacity>
        <TouchableOpacity onPress={hideNotification} hitSlop={BUTTON_HIT_SLOP}>
          {/*<CustomIcon name='close' style={[styles.close, { color: themes[theme].titleText }]} size={20} />*/}
        </TouchableOpacity>
      </View>
    )
  },
)


const mapStateToProps = state => ({
  isMasterDetail: state.app.isMasterDetail,
  customEmojis: state.customEmojis,
})

export default connect(mapStateToProps)(NotifierComponent)
