import React, {useRef, useState} from 'react';
import {connect} from 'react-redux';
import {Image, SafeAreaView, ScrollView, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {withTheme} from '../../theme';
import StatusBar from '../../containers/StatusBar';
import sharedStyles from '../Styles';
import styles from './styles';
import images from '../../assets/images';
import Button from '../../containers/Button';
import {loginSuccess as loginSuccessAction} from '../../actions/login';
import scrollPersistTaps from '../../utils/scrollPersistTaps';
import {showErrorAlert} from '../../lib/info';
import {isValidEmail} from '../../utils/validators';
import firebaseSdk from '../../lib/firebaseSdk';
import {CURRENT_USER} from '../../constants/keys';
import {appStart as appStartAction} from '../../actions/app';
import I18n from '../../i18n';
import {COLOR_WHITE, COLOR_YELLOW, themes} from '../../constants/colors';
import FloatingTextInput from '../../containers/FloatingTextInput';
import KeyboardView from '../../containers/KeyboardView';

const theme = 'light';

const SignInView = props => {
  const navigation = useNavigation();
  const {loginSuccess} = props;
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errEmail, setErrEmail] = useState('');
  const [errPassword, setErrPassword] = useState('');
  const emailInput = useRef(null);
  const passwordInput = useRef(null);

  const onGoToSignUp = () => {
    navigation.navigate('SignUp');
  };

  const forgotPassword = () => {
    navigation.navigate('ForgotPassword');
  };

  const isValid = () => {
    setErrEmail('');
    setErrPassword('');
    if (!email.length) {
      setErrEmail(I18n.t('please_enter_email'));
      emailInput.current.focus();
      return false;
    }
    if (!isValidEmail(email)) {
      setErrEmail(I18n.t('error-invalid-email-address'));
      emailInput.current.focus();
      return false;
    }
    if (!password.length) {
      setErrPassword(I18n.t('please_enter_password'));
      passwordInput.current.focus();
      return false;
    }
    return true;
  };

  const onSubmit = () => {
    if (isValid()) {
      setIsLoading(true);

      firebaseSdk
        .signInWithEmail(email, password)
        .then(async user => {
          setIsLoading(false);
          await AsyncStorage.setItem(CURRENT_USER, JSON.stringify(user));
          loginSuccess(user);
        })
        .catch(err => {
          setIsLoading(false);
          if (err.indexOf('auth/user-not-found') > 0) {
            showErrorAlert(I18n.t('error-user-not_registered'));
          } else if (err.indexOf('auth/wrong-password') > 0) {
            showErrorAlert(I18n.t('error-invalid-password'));
          } else {
            showErrorAlert(I18n.t('error-invalid-user'));
          }
          console.log('error', err);
        });
    }
  };

  return (
    <SafeAreaView
      style={{flex: 1, flexDirection: 'column', backgroundColor: COLOR_WHITE}}>
      <StatusBar />
      <KeyboardView style={sharedStyles.container} keyboardVerticalOffset={128}>
        <ScrollView
          style={{flex: 1, backgroundColor: COLOR_WHITE, height: '100%'}}
          {...scrollPersistTaps}
          keyboardShouldPersistTaps="handled">
          <View style={sharedStyles.headerContainer}>
            <Image style={styles.logo} source={images.logo} />
          </View>
          <View style={styles.formContainer}>
            <View style={styles.description}>
              <Text style={styles.loginTitle}>{I18n.t('Login')}</Text>
              <Text style={styles.loginText}>
                Log In with one of the following options
              </Text>
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
              onSubmitEditing={() => {
                passwordInput.current.focus();
              }}
              error={errEmail}
            />
            <FloatingTextInput
              inputRef={passwordInput}
              iconLeft={images.password}
              label={I18n.t('Password')}
              placeholder={'Enter your password'}
              returnKeyType="send"
              textContentType="oneTimeCode"
              onChangeText={value => setPassword(value)}
              theme={theme}
              secureTextEntry
              error={errPassword}
            />
            <View style={styles.forgotContainer}>
              <Text
                style={[styles.forgotText, {color: themes[theme].titleColor}]}
                onPress={forgotPassword}>
                {I18n.t('Forgot_Password')}
              </Text>
            </View>
            <Button
              style={styles.submitBtn}
              title={I18n.t('Login')}
              size="W"
              onPress={onSubmit}
              testID="login-submit"
              loading={isLoading}
              theme={theme}
            />
          </View>
        </ScrollView>
      </KeyboardView>
      <View style={styles.bottomContainer}>
        <Text style={styles.dontText}>
          {I18n.t('Do_not_have_an_account')} &nbsp;
        </Text>
        <Text
          style={[
            {...sharedStyles.link, color: COLOR_YELLOW},
            {fontFamily: 'Raleway', fontSize: 14},
          ]}
          onPress={onGoToSignUp}>
          Sign Up
        </Text>
      </View>
    </SafeAreaView>
  );
};

const mapDispatchToProps = dispatch => ({
  loginSuccess: params => dispatch(loginSuccessAction(params)),
  appStart: params => dispatch(appStartAction(params)),
});

export default connect(null, mapDispatchToProps)(withTheme(SignInView));
