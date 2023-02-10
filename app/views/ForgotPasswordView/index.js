import React, { useRef, useState } from 'react'
import { connect } from 'react-redux'
import { Image, SafeAreaView, ScrollView, Text, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { withTheme } from '../../theme'
import StatusBar from '../../containers/StatusBar'
import sharedStyles from '../Styles'
import styles from './styles'
import images from '../../assets/images'
import Button from '../../containers/Button'
import scrollPersistTaps from '../../utils/scrollPersistTaps'
import { isValidEmail } from '../../utils/validators'
import firebaseSdk from '../../lib/firebaseSdk'
import I18n from '../../i18n'
import { COLOR_BORDER, COLOR_WHITE, COLOR_YELLOW } from '../../constants/colors'
import FloatingTextInput from '../../containers/FloatingTextInput'
import KeyboardView from '../../containers/KeyboardView'

const theme = 'light'

const ForgotPasswordView = (props) => {
  const navigation = useNavigation()
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [errEmail, setErrEmail] = useState('')
  const emailInput = useRef(null)

  const onGoToSignIn = () => {
    navigation.navigate('SignIn')
  }

  const isValid = () => {
    setErrEmail('')
    if (!email.length) {
      setErrEmail(I18n.t('please_enter_email'))
      emailInput.current.focus()
      return false
    }
    if (!isValidEmail(email)) {
      setErrEmail(I18n.t('error-invalid-email-address'))
      emailInput.current.focus()
      return false
    }
    return true
  }

  const onSubmit = () => {
    if (isValid()) {
      // setIsLoading(true)
      navigation.navigate('UpdatePassword')
      // firebaseSdk.resetPassword(email).then(_ => {
      //   setIsLoading(false)
      //   navigation.navigate('UpdatePassword')
      // }).catch(_ => {
      //   setIsLoading(false)
      // })
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, flexDirection: 'column', backgroundColor: COLOR_WHITE }}>
      <StatusBar />
      <KeyboardView style={sharedStyles.container} keyboardVerticalOffset={128}>
        <ScrollView
          style={{ flex: 1, backgroundColor: COLOR_WHITE, height: '100%' }}
          {...scrollPersistTaps}
          keyboardShouldPersistTaps="handled"
        >
          <View style={sharedStyles.headerContainer}>
            <Image style={styles.logo} source={images.logo} />
          </View>
          <View style={styles.formContainer}>
            <View style={styles.description}>
              <Text style={styles.loginTitle}>{I18n.t('Forgot_Password')}</Text>
              <Text style={styles.loginText}>Don't worry! It happens.</Text>
              <Text style={styles.loginText}>Please enter the address associated with your account.</Text>
            </View>
            <FloatingTextInput
              inputRef={emailInput}
              iconLeft={images.mail}
              returnKeyType="next"
              keyboardType="email-address"
              textContentType="oneTimeCode"
              label={I18n.t('Email')}
              placeholder={'Enter your email'}
              onChangeText={val => setEmail(val)}
              theme={theme}
              outlineColor={COLOR_BORDER}
              error={errEmail}
            />
            <Button
              style={styles.submitBtn}
              title="Send Recover Link"
              size="W"
              onPress={onSubmit}
              loading={isLoading}
              theme={theme}
              pressingHighlight
            />
          </View>
        </ScrollView>
      </KeyboardView>
      <View style={styles.bottomContainer}>
        <Text style={styles.dontText}>Remember Password? Go To &nbsp;</Text>
        <Text
          style={[{ ...sharedStyles.link, color: COLOR_YELLOW }, { fontFamily: 'Raleway', fontSize: 14 }]}
          onPress={onGoToSignIn}>
          Log In
        </Text>
      </View>
    </SafeAreaView>
  )
}

const mapDispatchToProps = dispatch => ({})

export default connect(null, mapDispatchToProps)(withTheme(ForgotPasswordView))
