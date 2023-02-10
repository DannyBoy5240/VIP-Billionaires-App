import React, { useEffect } from 'react'
import { WebView } from 'react-native-webview'

import StatusBar from '../../containers/StatusBar'
import { withTheme } from '../../theme'
import { GradientHeader } from '../../containers/GradientHeader'
import MainScreen from '../../containers/MainScreen'
import * as HeaderButton from '../../containers/HeaderButton'


const ProductWebView = (props) => {
  const { navigation } = props
  const product = props.route.params?.product

  useEffect(() => {
    init()
  }, [])

  const init = () => {
    navigation.setOptions({
      headerLeft: () => (
        <HeaderButton.Drawer
          navigation={navigation}
          testID="rooms-list-view-sidebar"
        />
      ),
      title: product.name,
      headerBackground: () => <GradientHeader />,
    })
  }

  return (
    <MainScreen navigation={navigation}>
      <StatusBar />
      <WebView
        originWhitelist={['*']}
        source={{
          uri: 'https://www.vipbillionaires.com/product-page-1/crocodile-skin-apple-watch-straps-2',
        }}
      />
    </MainScreen>
  )

}

export default withTheme(ProductWebView)
