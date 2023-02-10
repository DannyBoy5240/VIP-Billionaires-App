import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { FlatList, ImageBackground, RefreshControl, Text } from 'react-native'
import firestore from '@react-native-firebase/firestore'
import { useNavigation } from '@react-navigation/native'

import { themes } from '../../constants/colors'
import StatusBar from '../../containers/StatusBar'
import { withTheme } from '../../theme'
import { withDimensions } from '../../dimensions'
import ActivityIndicator from '../../containers/ActivityIndicator'
import firebaseSdk, {
  DB_ACTION_UPDATE,
  NOTIFICATION_TYPE_LIKE,
} from '../../lib/firebaseSdk'
import Post from './Post'
import styles from '../ChatView/styles'
import images from '../../assets/images'
import SafeAreaView from '../../containers/SafeAreaView'
import { GradientHeader } from '../../containers/GradientHeader'
import I18n from '../../i18n'
import { navigateToProfile } from '../../utils/const'

const RecentView = props => {
  const navigation = useNavigation()
  const [state, setState] = useState({
    text: '',
    data: [],
    showModal: false,
    showAddModal: false,
    editMeetup: null,
    reviewMeetup: null,
    refreshing: false,
    loading: false,
    notifying: false,
  })

  const { user, theme } = props
  const { data, loading, refreshing } = state

  useEffect(() => {
    navigation.setOptions({
      title: I18n.t('recent_posts'),
      headerBackground: () => <GradientHeader />,
    })
  }, [])

  useEffect(() => {
    init()
  }, [])

  const init = async () => {
    const { user } = props
    const querySnapShot = await firestore()
      .collection(firebaseSdk.TBL_POST)
      .get()

    const userSnaps = await firestore().collection(firebaseSdk.TBL_USER).get()
    const users = []
    userSnaps.forEach(s => users.push(s.data()))

    const list = []
    querySnapShot.forEach(doc => {
      const post = doc.data()
      if (!user.blocked || !user.blocked.includes(post.userId)) {
        const owner = users.find(u => u.userId === post.userId)
        list.push({ id: doc.id, ...post, owner })
      }
    })
    list.sort((a, b) => b.date - a.date)
    setState({ ...state, data: list })
    console.log('list', list, users)
  }

  const onOpenPost = item => {
    navigation.push('PostDetail', { post: item })
  }

  const onOpenProfile = item => {
    const { user, navigation } = props
    if (item.userId === user.userId) {
      navigation.push('Profile')
    } else {
      navigateToProfile(navigation, user, item)
    }
  }

  const onToggleLike = (item, isLiking) => {
    const { user } = props

    let update = {}
    if (isLiking) {
      update = { id: item.id, likes: item.likes.filter(l => l !== user.userId) }
    } else {
      update = { id: item.id, likes: [...item.likes, user.userId] }
    }

    setState({ ...state, isLoading: true })
    firebaseSdk
      .setData(firebaseSdk.TBL_POST, DB_ACTION_UPDATE, update)
      .then(() => {
        if (!isLiking && item.owner.userId !== user.userId) {
          const postImage =
            item.type === 'video'
              ? item.thumbnail
              : item.type === 'photo'
                ? item.photo
                : ''
          const activity = {
            type: NOTIFICATION_TYPE_LIKE,
            sender: user.userId,
            receiver: item.owner.userId,
            content: '',
            text: item.text,
            postId: item.id,
            postImage,
            postType: item.type,
            title: item.owner.displayName,
            message: I18n.t('user_likes_your_post', {
              name: user.displayName,
            }),
            date: new Date(),
          }
          firebaseSdk.addActivity(activity, item.owner.token).then(r => {})
        }
      })
      .catch(() => {
        setState({ ...state, isLoading: false })
      })
  }

  const onActionPost = item => {}

  const renderFooter = () => {
    const { theme } = props
    if (loading) {
      return <ActivityIndicator theme={theme} size={'large'} />
    }
    return null
  }

  return (
    <ImageBackground
      style={styles.mainContainer}
      source={images.bg_splash_onboard}>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar />
        {data.length > 0 || loading ? (
          <FlatList
            style={{ flexGrow: 1, marginBottom: 40 }}
            data={data}
            renderItem={({ item, index }) => (
              <Post
                key={index}
                item={item}
                onPress={() => onOpenPost(item)}
                onPressUser={() => onOpenProfile(item)}
                onLike={isLiking => onToggleLike(item, isLiking)}
                isLiking={item.likes && item.likes.includes(user.userId)}
                onPressAction={() => onActionPost(item)}
                theme={theme}
              />
            )}
            keyExtractor={item => item.id}
            ListFooterComponent={renderFooter}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                tintColor={themes[theme].actionColor}
              />
            }
          />
        ) : (
          <Text style={styles.noPosts}>{I18n.t('no_posts')}</Text>
        )}
      </SafeAreaView>
    </ImageBackground>
  )
}

const mapStateToProps = state => ({
  user: state.login.user,
})

export default connect(
  mapStateToProps,
  null,
)(withTheme(withDimensions(RecentView)))
