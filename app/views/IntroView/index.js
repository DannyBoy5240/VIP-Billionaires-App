import React, { useRef } from 'react'
import { Image, ImageBackground, SafeAreaView, Text, View } from 'react-native'
import { connect } from 'react-redux'
import { withTheme } from '../../theme'
import styles from './styles'
import images from '../../assets/images'
import AppIntroSlider from 'react-native-app-intro-slider'
import sharedStyles from '../Styles'
import { themes } from '../../constants/colors'
import I18n from '../../i18n'
import Button from '../../containers/Button'
import { appReady } from '../../actions/app'

const theme = 'light'

const slides = [
  {
    key: 1,
    title: 'Welcome to VIP Billionaires',
    text: 'We know what it takes to get ahead in business and we want to help make that happen for you.',
    image: images.intro_1,
  },
  {
    key: 2,
    title: 'Welcome to VIP Billionaires',
    text: 'As a business professional, you know that your connections are everything.',
    image: images.intro_2,
  },
  {
    key: 3,
    title: 'Don\'t be afraid to grow.',
    text: 'You are the only one who can decide how you want your life to go, and if you\'re not growing, then you\'re shrinking.',
    image: images.intro_3,
  },
]

const IntroView = ({ appReady }) => {
  const sliderRef = useRef(null)
  const _renderItem = ({ item }) => (
    <ImageBackground style={styles.container} source={images.background}>
      <View style={styles.slide}>
        <Image source={item.image} style={styles.image} />
        <View style={styles.description}>
          <Text style={[styles.title, { color: themes[theme].titleColor }]}>{item.title}</Text>
          <Text style={[styles.text, { color: themes[theme].titleColor }]}>{item.text}</Text>
        </View>
      </View>
    </ImageBackground>
  )

  const _renderPagination = (activeIndex) => {
    return (
      <View style={styles.paginationContainer}>
        <SafeAreaView>
          <View style={styles.paginationDots}>
            {slides.length > 1 &&
              slides.map((_, i) => (
                <View
                  key={i}
                  style={i === activeIndex ? styles.activatedDot : [styles.dot]}
                />
              ))}
          </View>
          <View style={{ marginHorizontal: 48, marginTop: 48 }}>
            <Button
              style={styles.submitBtn}
              title={activeIndex < slides.length - 1 ? I18n.t('Next').toUpperCase() : 'Continue to app'}
              size="W"
              onPress={() => _onDone(activeIndex)}
              theme={theme}
              pressingHighlight
            />
          </View>
        </SafeAreaView>
      </View>
    )
  }


  const _onDone = (activeIndex) => {
    if (activeIndex < slides.length - 1) {
      sliderRef.current.goToSlide(++activeIndex)
    } else {
      appReady()
    }
  }
  return (
    <View
      style={[
        sharedStyles.container,
        { backgroundColor: themes[theme].backgroundColor },
      ]}>
      <AppIntroSlider
        ref={sliderRef}
        renderItem={_renderItem}
        data={slides}
        onDone={_onDone}
        renderPagination={_renderPagination}
        bottomButton
      />
    </View>

  )
}

const mapDispatchToProps = dispatch => ({
  appReady: () => dispatch(appReady()),
})

export default connect(null, mapDispatchToProps)(withTheme(IntroView))
