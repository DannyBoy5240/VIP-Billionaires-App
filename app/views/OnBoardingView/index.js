import React from 'react'
import { SafeAreaView, View, Image, Text, ImageBackground } from 'react-native'
import { connect } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { appStart as appStartAction } from '../../actions/app'
import images from '../../assets/images'
import StatusBar from '../../containers/StatusBar'
import Button from '../../containers/Button'
import { withTheme } from '../../theme'
import I18n from '../../i18n'
import {
  COLOR_WHITE, COLOR_YELLOW,
  themes,
} from '../../constants/colors'
import { styles } from './style'

const theme = 'light'

const OnBoardingView = () => {
  const navigation = useNavigation()

  return (
    <ImageBackground style={styles.container} source={images.background}>
      <SafeAreaView>
        <StatusBar />
        <View style={styles.mainContainer}>
          <View style={styles.logoContainer}>
            <Image style={styles.logo} source={images.logo} />
          </View>
          <View style={styles.welcome}>
            <Text style={{textAlign: 'center'}}>
              <Text style={[styles.welcomeTitle, { color: themes[theme].titleColor }]}>
                Welcome to &nbsp;
              </Text>
              <Text style={[styles.welcomeTitle, { color: COLOR_YELLOW }]}>
                VIP Billionaires
              </Text>
            </Text>
              <Text style={[styles.welcomeText, { color: themes[theme].textColor }]}>{I18n.t('Onboard_text')}</Text>
          </View>
          <View style={styles.buttonWrap}>
            <Button
              style={styles.submitBtn}
              title={I18n.t('SignIn').toUpperCase()}
              size="W"
              onPress={() => navigation.replace('SignIn')}
              testID="login-view-submit"
              theme={theme}
            />
            <Button
              style={styles.submitBtn}
              title={I18n.t('Register')}
              type="secondary"
              size="W"
              onPress={() => navigation.replace('SignUp')}
              testID="login-view-submit"
              theme={theme}
            />
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  )
}

const mapDispatchToProps = dispatch => ({
  appStart: params => dispatch(appStartAction(params)),
})

export default connect(null, mapDispatchToProps)(withTheme(OnBoardingView))
