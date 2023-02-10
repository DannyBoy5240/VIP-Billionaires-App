import React from 'react';
import {Image, SafeAreaView, ScrollView, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {connect} from 'react-redux';

import StatusBar from '../../containers/StatusBar';
import {withTheme} from '../../theme';
import styles from './styles';
import images from '../../assets/images';
import sharedStyles from '../../views/Styles';
import {
  COLOR_BORDER,
  COLOR_WHITE,
  COLOR_YELLOW,
  HEADER_BAR_START,
  NAV_BAR_END,
  NAV_BAR_START,
  themes,
} from '../../constants/colors';
import scrollPersistTaps from '../../utils/scrollPersistTaps';
import {loginSuccess as loginSuccessAction} from '../../actions/login';
import KeyboardView from '../../containers/KeyboardView';
import I18n from '../../i18n';
import FloatingTextInput from '../../containers/FloatingTextInput';
import Button from '../../containers/Button';

const theme = 'light';

const VerifyEmailView = props => {
  return (
    <SafeAreaView style={styles.container}>
      {/*<StatusBar />*/}
      <ScrollView
        contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}
        {...scrollPersistTaps}
        keyboardShouldPersistTaps="handled">
        <View style={styles.container}>
          <Image style={styles.logo} source={images.email_verified} />
          <Text
            style={[
              styles.mainText,
              {marginTop: 36, color: themes[theme].textColor},
            ]}>
            Verify your email address
          </Text>
          <Text style={[styles.subText, {color: themes[theme].textColor}]}>
            Thank you for your registration, before we move forward please
            verify your email address
          </Text>
          <Text
            style={[
              styles.subText,
              {color: themes[theme].textColor, marginTop: 24},
            ]}>
            <Text>View your email inbox &nbsp;</Text>
            <Text
              style={[
                {...sharedStyles.link, color: COLOR_YELLOW},
                {
                  fontFamily: 'Raleway',
                  fontSize: 14,
                  textDecorationLine: 'none',
                },
              ]}>
              Email Inbox
            </Text>
          </Text>
          <Text
            style={[
              styles.subText,
              {color: themes[theme].textColor, marginTop: 40, lineHeight: 25},
            ]}>
            {
              'ご登録ありがとうございます。 \n次に進む前にメールアドレスの確認をお願いいたします。'
            }
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const mapStateToProps = state => ({
  user: state.login.user,
});

const mapDispatchToProps = dispatch => ({
  loginSuccess: params => dispatch(loginSuccessAction(params)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withTheme(VerifyEmailView));
