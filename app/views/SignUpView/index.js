import React, {useRef, useState} from 'react';
import {Image, SafeAreaView, Text, View, ScrollView} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {connect} from 'react-redux';

import {withTheme} from '../../theme';
import sharedStyles from '../Styles';
import StatusBar from '../../containers/StatusBar';
import styles from './styles';
import Button from '../../containers/Button';
import images from '../../assets/images';
import {isValidEmail} from '../../utils/validators';
import {showErrorAlert, showToast} from '../../lib/info';
import firebaseSdk from '../../lib/firebaseSdk';
import {COLOR_WHITE, COLOR_YELLOW} from '../../constants/colors';
import I18n from '../../i18n';
import KeyboardView from '../../containers/KeyboardView';
import {CURRENT_USER} from '../../constants/keys';
import {loginSuccess as loginSuccessAction} from '../../actions/login';
import scrollPersistTaps from '../../utils/scrollPersistTaps';
import {sendEmail} from '../../utils/sendmail';
import FloatingTextInput from '../../containers/FloatingTextInput';

const theme = 'light';

const SignUpView = props => {
  const {loginSuccess} = props;
  const navigation = useNavigation();
  const [state, setState] = useState({
    name: '',
    gender: null,
    city: '',
    phone: '',
    email: '',
    password: '',
    confirm_password: '',
    birthday: null,
    job: '',
    company: '',
    role: '',
    years_of_service: 1,
    salary: 2,
    purpose: '',
    topScrollEnable: true,
    allowTerms: false,
    isLoading: false,
  });

  const nameInput = useRef(null);
  const cityInput = useRef(null);
  const phoneInput = useRef(null);
  const emailInput = useRef(null);
  const passwordInput = useRef(null);
  const confirmPasswordInput = useRef(null);
  const jobInput = useRef(null);
  const companyInput = useRef(null);
  const roleInput = useRef(null);
  const purposeInput = useRef(null);

  const onGoToSignIn = () => {
    navigation.navigate('SignIn');
  };

  const onGotoTerms = () => {
    navigation.navigate('About', {type: 0});
  };

  const onGotoPrivacy = () => {
    navigation.navigate('About', {type: 1});
  };

  const isValid = () => {
    const {name, city, gender, password, confirm_password, email} = state;

    // if (!name.length) {
    //   showToast(I18n.t('please_enter_name'))
    //   nameInput.current.focus()
    //   return false
    // }
    // if (!gender) {
    //   showToast(I18n.t('please_select_gender'))
    //   return false
    // }
    // if (!city.length) {
    //   showToast(I18n.t('please_enter_city'))
    //   cityInput.current.focus()
    //   return false
    // }
    if (!email.length) {
      showToast(I18n.t('please_enter_email'));
      emailInput.current.focus();
      return false;
    }
    if (!isValidEmail(email)) {
      showToast(I18n.t('error-invalid-email-address'));
      emailInput.current.focus();
      return false;
    }
    if (!password.length) {
      showToast(I18n.t('please_enter_password'));
      passwordInput.current.focus();
      return false;
    }
    if (password.length < 6) {
      showToast(I18n.t('please_enter_password_with_min_length_6'));
      passwordInput.current.focus();
      return false;
    }
    if (password !== confirm_password) {
      showToast(I18n.t('error-invalid-password-repeat'));
      confirmPasswordInput.current.focus();
      return false;
    }
    return true;
  };

  const onSubmit = () => {
    if (isValid()) {
      setState({...state, isLoading: true});
      const {
        name,
        email,
        password,
        phone,
        gender,
        city,
        birthday,
        job,
        company,
        role,
        years_of_service,
        salary,
        purpose,
      } = state;

      const user = {
        displayName: name,
        gender,
        city,
        phone,
        email: email,
        password: password,
        birthday,
        job,
        company,
        role,
        years_of_service,
        salary,
        purpose,
      };
      const mailBody =
        'Name : ' +
        name +
        '\nGender : ' +
        gender +
        '\nCity : ' +
        city +
        '\nPhone : ' +
        phone +
        '\nEmail : ' +
        email;

      console.log(mailBody);

      // sendEmail('info@zedinternational.net', 'A new user registered', mailBody)

      firebaseSdk
        .signUp(user)
        .then(async () => {
          showToast(I18n.t('Register_complete'));
          firebaseSdk
            .signInWithEmail(email, password)
            .then(async user => {
              await AsyncStorage.setItem(CURRENT_USER, JSON.stringify(user));
              setState({...state, isLoading: false});
              loginSuccess(user);
            })
            .catch(error => {
              navigation.navigate('SignIn');
            });
        })
        .catch(err => {
          showErrorAlert(I18n.t('Register_fail'));
          setState({...state, isLoading: false});
        });
    }
  };

  const {
    isLoading,
    birthday,
    gender,
    salary,
    years_of_service,
    topScrollEnable,
    allowTerms,
  } = state;

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
              <Text style={styles.loginTitle}>{I18n.t('sign_up')}</Text>
              <Text>
                <Text style={styles.loginText}>Already have an account? </Text>
                <Text
                  style={[
                    {...sharedStyles.link, color: COLOR_YELLOW},
                    {
                      fontFamily: 'Raleway',
                      fontSize: 14,
                    },
                  ]}
                  onPress={onGoToSignIn}>
                  Log In{' '}
                </Text>
              </Text>
            </View>
            <FloatingTextInput
              inputRef={emailInput}
              returnKeyType="next"
              keyboardType="email-address"
              textContentType="oneTimeCode"
              label={I18n.t('Email')}
              placeholder={'Enter Your email'}
              onChangeText={email => setState({...state, email})}
              theme={theme}
              onSubmitEditing={() => {
                passwordInput.current.focus();
              }}
            />
            <FloatingTextInput
              inputRef={passwordInput}
              returnKeyType="next"
              secureTextEntry
              textContentType="oneTimeCode"
              label={'Create Password'}
              placeholder={'Enter Your Password'}
              onChangeText={value => setState({...state, password: value})}
              theme={theme}
              onSubmitEditing={() => {
                confirmPasswordInput.current.focus();
              }}
            />
            <FloatingTextInput
              inputRef={confirmPasswordInput}
              returnKeyType="next"
              secureTextEntry
              textContentType="oneTimeCode"
              label={'Submit New Password'}
              placeholder={'Submit Your Password'}
              onChangeText={value =>
                setState({...state, confirm_password: value})
              }
              theme={theme}
            />
            <Button
              style={styles.submitBtn}
              title={'Submit'}
              size="W"
              onPress={onSubmit}
              loading={isLoading}
              theme={theme}
            />
          </View>
        </ScrollView>
      </KeyboardView>
    </SafeAreaView>
  );
};

const mapDispatchToProps = dispatch => ({
  loginSuccess: params => dispatch(loginSuccessAction(params)),
});

export default connect(null, mapDispatchToProps)(withTheme(SignUpView));
