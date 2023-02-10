import React from 'react'
import { Image, ScrollView, Text, View, SafeAreaView } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { connect } from 'react-redux'
import StatusBar from '../../containers/StatusBar'
import { withTheme } from '../../theme'
import styles from './styles'
import images from '../../assets/images'
import sharedStyles from '../../views/Styles'

import {
  COLOR_WHITE,
  NAV_BAR_END,
  NAV_BAR_START,
  themes,
} from '../../constants/colors'
import I18n from '../../i18n'
import scrollPersistTaps from '../../utils/scrollPersistTaps'
import { logout as logoutAction } from '../../actions/login'

import { Avatar } from 'react-native-paper'
import BasicInfoUploaded from '../../containers/BasicInfoUploaded'
import ExperienceUploaded from '../../containers/ExperienceUploaded'
import { showConfirmationAlert } from '../../lib/info'

const theme = 'light'

const ThankYouView = ({ user, logout, navigation }) => {

  const { displayName, gender, location, city, phone, birthday, salary, job, company, years_of_service } = user

  const onLogout = () => {
    showConfirmationAlert({
      title: I18n.t('Logout'),
      message: I18n.t('are_you_sure_to_log_out'),
      callToAction: I18n.t('Confirm'),
      onPress: () => {
        if (global.unSubscribeRoom) {
          global.unSubscribeRoom()
          global.unSubscribeRoom = undefined
        }
        logout()
      },
    })
  }

  return (
    <SafeAreaView
      style={[
        sharedStyles.container,
        { flexDirection: 'column', backgroundColor: themes[theme].backgroundColor }
      ]}>
      <ScrollView
        {...scrollPersistTaps}
        style={{flex: 1}}
        contentContainerStyle={{
          flexGrow: 1,
          backgroundColor: themes[theme].backgroundColor,
        }}>
        <Text onPress={onLogout} style={styles.logoutText}>Logout</Text>
        <Image style={styles.logo} source={images.logo} />
        <Text
          style={[
            styles.mainText,
            {marginTop: 40, color: themes[theme].activeTintColor},
          ]}>
          {I18n.t('Thank_you_title_1')}
        </Text>
        <Text style={[styles.subText, {color: themes[theme].activeTintColor}]}>
          Your application will be examined and within a few hours you will be
          notified of the result.
        </Text>
        <Text style={[styles.subText, {color: themes[theme].activeTintColor}]}>
          * There might be cases your application might not be approved. In that
          case, the payment will be fully refunded.
        </Text>
        <Text style={[styles.subText, {color: themes[theme].activeTintColor}]}>
          このたびは入会のご申請をいただきありがとうございます。これより入会審査の後数時間で結果をお知らせさせていただきます。
        </Text>
        <Text style={[styles.subText, {color: themes[theme].activeTintColor}]}>
          ※審査の結果、入会のご希望に添えない場合もございます。
          その場合にはいただいた代金は返金させていただきます。
        </Text>
        <Text style={styles.submittedApplicationText}>Your submitted applicationn</Text>
        <Avatar.Image size={56} source={user.avatar ? user.avatar:images.default_avatar} style={styles.avatar} />
        <BasicInfoUploaded name={displayName} gender={gender} dob={birthday} phone={phone} location={ location && location.length > 0 ? location : city} />
        <ExperienceUploaded salary={salary} jobTitle={job} companyName={company} numberOfYears={years_of_service} />
      </ScrollView>
    </SafeAreaView>
  );
}

const mapStateToProps = state => ({
  user: state.login.user,
})

const mapDispatchToProps = dispatch => ({
  logout: params => dispatch(logoutAction(params)),
})

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(ThankYouView))
