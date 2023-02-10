import React, { useEffect } from 'react'
import {
  View,
  PermissionsAndroid,
  Platform,
  Image,
  ImageBackground,
} from 'react-native'
import { connect } from 'react-redux'

import { appInit as appInitAction } from '../../actions/app'
import images from '../../assets/images'
import StatusBar from '../../containers/StatusBar'
import { withTheme } from '../../theme'
import { PERMISSIONS, requestMultiple } from 'react-native-permissions'
import { styles } from './style'
import { COLOR_BLACK, themes } from '../../constants/colors'

const SplashView = (props) => {
  useEffect(() => {
    requestPermission()
    appInit()
  }, [])

  const appInit = () => {
    setTimeout(() => {
      props.appInit()
    }, 1500)
  }

  const requestPermission = () => {
    if (Platform.OS === 'android') {
      requestPermissionAndroid()
        .catch(err => {
          console.log('request permission error', err)
        })
    } else {
      requestPermissionIOS().catch(err => {
        console.log('request permission error', err)
      })
    }
  }

  const requestPermissionAndroid = async () => {
    try {
      const results = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.CAMERA,
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      ])
      if (
        results[PermissionsAndroid.PERMISSIONS.CAMERA] ===
        PermissionsAndroid.RESULTS.GRANTED &&
        results[PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE] ===
        PermissionsAndroid.RESULTS.GRANTED &&
        results[PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION] ===
        PermissionsAndroid.RESULTS.GRANTED
      ) {
      } else {
        console.log('permission denied')
      }
    } catch (err) {
      console.log(err)
    }
  }

  const requestPermissionIOS = () => {
    return new Promise((resolve, reject) => {
      requestMultiple([PERMISSIONS.IOS.CAMERA, PERMISSIONS.IOS.PHOTO_LIBRARY])
        .then(statuses => {
          console.log('request permission', statuses)
          resolve()
        })
        .catch(err => {
          console.log('request permission', err)
          reject(err)
        })
    })
  }

  return (
    <ImageBackground style={styles.container} source={images.bg_splash}>
      <StatusBar />
    </ImageBackground>
  )
}

const mapDispatchToProps = dispatch => ({
  appInit: () => dispatch(appInitAction()),
})

export default connect(null, mapDispatchToProps)(withTheme(SplashView))
