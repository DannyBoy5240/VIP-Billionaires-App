import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import firestore from '@react-native-firebase/firestore'
import {
  FlatList,
  Image,
  ImageBackground,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

import styles from './styles'
import { HEADER_BAR_END, HEADER_BAR_START, themes } from '../../constants/colors'
import StatusBar from '../../containers/StatusBar'
import SafeAreaView from '../../containers/SafeAreaView'
import { withTheme } from '../../theme'
import { setUser as setUserAction } from '../../actions/login'
import images from '../../assets/images'
import firebaseSdk, { DB_ACTION_UPDATE } from '../../lib/firebaseSdk'
import ActivityIndicator from '../../containers/ActivityIndicator'
import sharedStyles from '../Styles'
import * as HeaderButton from '../../containers/HeaderButton'
import { GradientHeader } from '../../containers/GradientHeader'
import I18n from '../../i18n'
import { VectorIcon } from '../../containers/VectorIcon'

const BlockView = (props) => {
  const { user, theme, navigation } = props

  const [data, setData] = useState([])
  const [unBlocked, setUnBlocked] = useState([])
  const [refreshing, setRefreshing] = useState(false)
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(false)

  // useEffect(() => {
  //   navigation.setOptions({
  //     headerLeft: () => (
  //       <TouchableOpacity style={styles.header} onPress={() => navigation.toggleDrawer()}>
  //         <VectorIcon type="MaterialCommunityIcons" name="arrow-left" color={themes[theme].titleColor} size={24} />
  //       </TouchableOpacity>
  //     ),
  //     title: null,
  //     headerRight: () => (<></>),
  //     headerStyle: {
  //       backgroundColor: themes[theme].backgroundColor,
  //       shadowOpacity: 0,
  //     },
  //   })
  // }, [theme])

  useEffect(() => {
    navigation.setOptions({
      title: I18n.t('Blocked'),
      headerRight: () => (
        <HeaderButton.Complete
          navigation={navigation}
          onPress={onUnBlock}
          testID="rooms-list-view-create-channel"
        />
      ),
    })
  }, [unBlocked])

  useEffect(() => {
    init()
  }, [user])

  const init = async () => {
    const userSnaps = await firestore().collection(firebaseSdk.TBL_USER).get()

    const block_list = []
    userSnaps.forEach(s => {
      const userInfo = { ...s.data(), id: s.id }
      if (userInfo.userId !== user.userId) {
        if (user.blocked && user.blocked.includes(userInfo.userId)) {
          block_list.push(userInfo)
        }
      }
    })
    setData(block_list)
    setLoading(false)
    console.log('block list', block_list)
  }

  const toggleUnBlock = item => {
    if (unBlocked.includes(item.userId)) {
      setUnBlocked(unBlocked.filter(b => b !== item.userId))
    } else {
      setUnBlocked([...unBlocked, item.userId])
    }
  }

  const onUnBlock = () => {
    const { user, setUser } = props

    if (!user.blocked) {
      return
    }

    let blocked = user.blocked.filter(b => !unBlocked.includes(b))
    let update = { id: user.id, blocked }

    setUpdating(true)
    firebaseSdk
      .setData(firebaseSdk.TBL_USER, DB_ACTION_UPDATE, update)
      .then(() => {
        setUser({ blocked: blocked })
        setUpdating(false)
        // init();
      })
      .catch(err => {
        setUpdating(false)
      })
  }

  const renderItem = ({ item }) => {
    let fUnBlocked = unBlocked.includes(item.userId)
    return (
      <View style={styles.itemContainer}>
        <View style={styles.itemHeader}>
          <Image
            source={item.avatar ? { uri: item.avatar } : images.default_avatar}
            style={styles.itemImage}
          />
          <View style={styles.itemContent}>
            <Text style={[styles.itemText, { color: themes[theme].activeTintColor }]}>{item.displayName}</Text>
            <Text
              style={[styles.itemPost, { color: themes[theme].infoText }]}>{`0 ${I18n.t('Posts').toLowerCase()}`}</Text>
          </View>
        </View>
        <TouchableOpacity onPress={() => toggleUnBlock(item)}>
          <Text style={fUnBlocked ? styles.blockText : styles.unBlockText}>
            {fUnBlocked ? I18n.t('Block') : `✓ ${I18n.t('Unblock')}`}
          </Text>
        </TouchableOpacity>
      </View>
    )
  }

  const renderFooter = () => {
    if (loading) {
      return <ActivityIndicator theme={theme} size={'large'} />
    }
    return null
  }

  const onRefresh = () => {
    setRefreshing(true)
    init()
  }

  return (
    <View
      style={[sharedStyles.container, { backgroundColor: themes[theme].navbarBackground }]}
      source={images.bg_splash_onboard}>
      <SafeAreaView style={[sharedStyles.contentContainer, {
        flex: 1,
        overflow: 'hidden',
        paddingTop: 20,
        paddingHorizontal: 10,
        backgroundColor: themes[theme].backgroundColor
      }]}>
        <StatusBar />
        {updating && (
          <ActivityIndicator absolute theme={theme} size={'large'} />
        )}
        <View style={styles.container}>
          {data.length > 0 && (
            <FlatList
              data={data}
              renderItem={renderItem}
              keyExtractor={item => item.userId}
              ListFooterComponent={renderFooter}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                  tintColor={themes[theme].actionColor}
                />
              }
            />
          )}
        </View>
      </SafeAreaView>
    </View>
  )
}

const mapStateToProps = state => ({
  user: state.login.user,
})

const mapDispatchToProps = dispatch => ({
  setUser: params => dispatch(setUserAction(params)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withTheme(BlockView))
