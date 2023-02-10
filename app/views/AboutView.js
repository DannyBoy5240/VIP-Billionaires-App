import React, { useState, useEffect } from 'react'
import { WebView } from 'react-native-webview'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Text, View } from 'react-native'

import { themes } from '../constants/colors'
import StatusBar from '../containers/StatusBar'
import SafeAreaView from '../containers/SafeAreaView'
import { withTheme } from '../theme'
import {
  CONTENT_PRIVACY_POLICY,
  CONTENT_PRIVACY_POLICY_JP,
  CONTENT_TERMS_AND_CONDITIONS,
  CONTENT_TERMS_AND_CONDITIONS_JP,
  CONTENT_USER_AGREEMENT,
  CONTENT_USER_AGREEMENT_JP,
} from '../constants/app'
import sharedStyles from './Styles'
import I18n from '../i18n'
import styles from './ActivityView/styles'
import * as HeaderButton from '../containers/HeaderButton'
import { GradientHeader } from '../containers/GradientHeader'

const AboutView = props => {
  const route = useRoute()
  const navigation = useNavigation()
  const [titleText, setTitleText] = useState('')
  const [contentText, setContentText] = useState('')
  const { theme } = props
  // const { type } = route.params

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Text onPress={() => {navigation.toggleDrawer()}} style={[styles.headerText, { color: themes[theme].titleText }]}>Notifications</Text>
      ),
      title: null,
      headerRight: () => (<></>),
      headerStyle: {
        backgroundColor: themes[theme].backgroundColor,
      },
    })
  }, [theme])

  const type = 0
  useEffect(() => {
    checkType()
    init()
  }, [titleText])

  const checkType = () => {
    let title = ''
    let content = ''

    switch (type) {
      case 0:
        title = I18n.t('Terms_of_use')
        content = `<html><head><meta name="viewport" content="width=device-width, initial-scale=0.8"><style>body{padding: 8px; line-height: 1.4rem}</style></head><body>${
          I18n.locale === 'ja'
            ? CONTENT_TERMS_AND_CONDITIONS_JP
            : CONTENT_TERMS_AND_CONDITIONS
        }</body></html>`
        break
      case 1:
        title = I18n.t('Privacy_policy')
        content = `<html><head><meta name="viewport" content="width=device-width, initial-scale=0.8"><style>body{padding: 8px; line-height: 1.4rem}</style></head><body>${
          I18n.locale === 'ja'
            ? CONTENT_PRIVACY_POLICY_JP
            : CONTENT_PRIVACY_POLICY
        }</body></html>`
        break
      case 2:
        title = I18n.t('User_agreement')
        content = `<html><head><meta name="viewport" content="width=device-width, initial-scale=0.8"><style>body{padding: 8px; line-height: 1.4rem}</style></head><body>${
          I18n.locale === 'ja'
            ? CONTENT_USER_AGREEMENT_JP
            : CONTENT_USER_AGREEMENT
        }</body></html>`
    }
    setTitleText(title)
    setContentText(content)
  }

  const init = () => {
    navigation.setOptions({
      title: titleText,
    })
  }

  return (
    <SafeAreaView style={{ backgroundColor: themes[theme].navbarBackground }}>
      <StatusBar />
      <View style={[sharedStyles.contentContainer, {
        flex: 1,
        overflow: 'hidden',
        paddingTop: 20,
        paddingHorizontal: 10,
        backgroundColor: themes[theme].backgroundColor,
      }]}>
        <WebView
          originWhitelist={['*']}
          source={{ html: `<div style="color: ${themes[theme].activeTintColor}">${contentText}</div>`, baseUrl: '' }}
          style={{ backgroundColor: 'transparent' }}
        />
      </View>
    </SafeAreaView>
  )
}

export default withTheme(AboutView)
