import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import {
  ImageBackground,
  ScrollView,
  Text,
  View,
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { withTheme } from '../../theme'
import KeyboardView from '../../containers/KeyboardView'
import StatusBar from '../../containers/StatusBar'
import sharedStyles from '../Styles'
import styles from './styles'
import images from '../../assets/images'
import Button from '../../containers/Button'
import scrollPersistTaps from '../../utils/scrollPersistTaps'
import SafeAreaView from '../../containers/SafeAreaView'
import { showErrorAlert, showToast } from '../../lib/info'
import { isValidEmail } from '../../utils/validators'
import firebaseSdk from '../../lib/firebaseSdk'
import { CURRENT_USER } from '../../constants/keys'
import { setUser as setUserAction } from '../../actions/login'
import I18n from '../../i18n'
import { themes } from '../../constants/colors'
import FloatingTextInput from '../../containers/FloatingTextInput'

const SecurityView = (props) => {
  const { theme, navigation } = props
  const [state, setState] = useState({
    isLoading: false,
    email: '',
    old_password: '',
    password: '',
  })

  const emailInput = useRef(null)
  const oldPasswordInput = useRef(null)
  const passwordInput = useRef(null)

  useEffect(() => {
    navigation.setOptions({
      title: I18n.t('Security_setting'),
    })
  }, [])

  const isValid = () => {
    const { email, password, old_password } = state
    if (!email.length) {
      showToast(I18n.t('please_enter_email'))
      emailInput.current.focus()
      return false
    }
    if (!isValidEmail(email)) {
      showToast(I18n.t('error-invalid-email-address'))
      emailInput.current.focus()
      return false
    }
    if (!old_password.length) {
      showToast(I18n.t('please_enter_old_password'))
      oldPasswordInput.focus()
      return false
    }
    if (!password.length) {
      showToast(I18n.t('please_enter_password'))
      passwordInput.focus()
      return false
    }
    return true
  }

  const onSubmit = () => {
    if (isValid()) {
      const { email, old_password, password } = state
      const { user, setUser } = props
      setState({ ...state, isLoading: true })

      firebaseSdk
        .reauthenticate(email, old_password)
        .then(() => {
          firebaseSdk
            .updateCredential(email, password)
            .then(async () => {
              setState({ ...state, isLoading: false })
              const newUser = { ...user, email: email }
              await AsyncStorage.setItem(CURRENT_USER, JSON.stringify(newUser))
              setUser(newUser)
              showToast(I18n.t('Updating_security_complete'))
            })
            .catch(err => {
              setState({ ...state, isLoading: false })
              showErrorAlert(I18n.t('Updating_security_failed'))
              console.log('error', err)
            })
        })
        .catch(err => {
          setState({ ...state, isLoading: false })
          showErrorAlert(I18n.t('error-invalid-email_or_password'))
        })
    }
  }


  return (
    <View
      style={[sharedStyles.container, { backgroundColor: themes[theme].navbarBackground }]}
      source={images.bg_splash_onboard}>
      <KeyboardView style={[sharedStyles.contentContainer, {
        flex: 1,
        overflow: 'hidden',
        paddingHorizontal: 10,
        backgroundColor: themes[theme].backgroundColor,
      }]} keyboardVerticalOffset={128}>
        <StatusBar />
        <ScrollView style={{ flexGrow: 1 }} {...scrollPersistTaps}>
          <SafeAreaView>
            <View style={styles.headerContainer}>
              <Text style={[styles.headerText, { color: themes[theme].activeTintColor }]}>
                {I18n.t('Update_security_caption')}
              </Text>
            </View>
            <View style={styles.formContainer}>
              <FloatingTextInput
                inputRef={e => {
                  emailInput.current = e
                }}
                iconLeft={images.mail}
                label={I18n.t('Email')}
                returnKeyType="next"
                keyboardType="email-address"
                textContentType="oneTimeCode"
                onChangeText={email => setState({ ...state, email: email })}
                onSubmitEditing={() => {
                  oldPasswordInput.current.focus()
                }}
                theme={theme}
              />
              <FloatingTextInput
                inputRef={e => {
                  oldPasswordInput.current = e
                }}
                iconLeft={images.password}
                label={I18n.t('Old_password')}
                returnKeyType="send"
                secureTextEntry
                textContentType="oneTimeCode"
                onChangeText={value => setState({ ...state, old_password: value })}
                onSubmitEditing={() => {
                  passwordInput.current.focus()
                }}
                theme={theme}
              />
              <FloatingTextInput
                inputRef={e => {
                  passwordInput.current = e
                }}
                iconLeft={images.password}
                label={I18n.t('New_Password')}
                returnKeyType="send"
                secureTextEntry
                textContentType="oneTimeCode"
                onChangeText={value => setState({ ...state, password: value })}
                theme={theme}
              />
              <Button
                style={styles.submitBtn}
                title={I18n.t('Change_password')}
                size="W"
                onPress={onSubmit}
                testID="security-view-submit"
                loading={state.isLoading}
                theme={theme}
              />
            </View>
          </SafeAreaView>
        </ScrollView>
      </KeyboardView>
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
)(withTheme(SecurityView))
