import React from 'react'
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Image,
  ImageBackground,
} from 'react-native'

import StatusBar from '../containers/StatusBar'
import { withTheme } from '../theme'
import { themes } from '../constants/colors'

import sharedStyles from './Styles'
import images from '../assets/images'

const styles = StyleSheet.create({
  mainContainer: {
    flexGrow: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    marginTop: 120,
  },
  logo: {
    height: 240,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  logoText: {
    maxWidth: '80%',
    resizeMode: 'contain',
    alignSelf: 'center',
    tintColor: 'white',
  },
})

const AuthLoadingView = React.memo(({ theme }) => (
  <ImageBackground
    style={sharedStyles.container}
    source={images.bg_splash_back}>
    <StatusBar />
    <View style={styles.mainContainer}>
      <View style={styles.logoContainer}>
        <Image source={images.logo} style={styles.logo} />
        <Image style={styles.logoText} source={images.logo_text} />
      </View>
      <ActivityIndicator color={themes[theme].activeTintColor} size="large" />
    </View>
  </ImageBackground>
))

export default withTheme(AuthLoadingView)
