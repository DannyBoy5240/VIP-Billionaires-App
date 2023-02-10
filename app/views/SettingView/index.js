import React, { useEffect, useState } from 'react'
import { FlatList, Text, View } from 'react-native'
import { connect } from 'react-redux'
import DialogInput from 'react-native-dialog-input'
import { TouchableHighlight } from 'react-native-gesture-handler'

import styles from './styles'
import { withTheme } from '../../theme'
import { VectorIcon } from '../../containers/VectorIcon'
import I18n from '../../i18n'
import sharedStyles from '../Styles'
import { themes } from '../../constants/colors'
import ActivityIndicator from '../../containers/ActivityIndicator'
import { logout as logoutAction } from '../../actions/login'
import firebaseSdk from '../../lib/firebaseSdk'
import { showErrorAlert } from '../../lib/info'

const SettingView = (props) => {
  const { navigation, theme } = props
  const [showDeleteAccount, setShowDeleteAccount] = useState(false)
  const [loading, setLoading] = useState(false)
  const menus = [
    { id: 'profile', title: I18n.t('Profile'), type: 'title' },
    {
      id: 'security_settings',
      title: I18n.t('Security_setting'),
      type: 'view',
    },
    { id: 'privacy_policy', title: I18n.t('Privacy_policy'), type: 'title' },
    { id: 'term_and_conditions', title: I18n.t('Terms_of_use'), type: 'view' },
    {
      id: 'privacy_policy_view',
      title: I18n.t('Privacy_policy'),
      type: 'view',
    },
    { id: 'blocked', title: I18n.t('Blocked'), type: 'view' },
    { id: 'delete', title: I18n.t('Delete'), type: 'view', danger: true },
  ]

  useEffect(() => {
    navigation.setOptions({
      title: I18n.t('Settings'),
    })
  }, [])

  const onPressItem = menu_id => {
    switch (menu_id) {
      case 'security_settings':
        navigation.navigate('Security')
        break
      case 'term_and_conditions':
        navigation.navigate('About', { type: 0 })
        break
      case 'privacy_policy_view':
        navigation.navigate('About', { type: 1 })
        break
      case 'blocked':
        navigation.navigate('Block')
        break
      case 'delete':
        setShowDeleteAccount(true)
        break
    }
  }

  const deleteAccount = (password) => {
    const { user, logout } = props
    setLoading(true)

    firebaseSdk
      .signInWithEmail(user.email, password)
      .then(_ => {
        firebaseSdk
          .deleteUser(user.id)
          .then(_ => {
            setLoading(false)
            logout()
          })
          .catch(err => {
            setLoading(false)
            console.log('error', err)
          })
      })
      .catch(err => {
        setLoading(false)
        showErrorAlert(I18n.t('error-invalid-password'))
        console.log('error', err)
      })
  }

  const renderItem = ({ item }) => {
    if (item.type === 'title') {
      return (
        <View style={styles.itemContainer}>
          <Text style={[styles.titleText, { color: themes[theme].infoText }]}>{item.title}</Text>
        </View>
      )
    }
    return (
      <TouchableHighlight
        underlayColor={themes[theme].itemPressedColor}
        onPress={() => onPressItem(item.id)}
        style={styles.itemContainer}>
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text
            style={[styles.itemText, { color: item.danger ? 'red' : themes[theme].activeTintColor }]}>{item.title}</Text>
          {item.type === 'view' && (
            <VectorIcon
              type={'Ionicons'}
              name={'md-chevron-forward'}
              size={20}
              color={themes[theme].activeTintColor}
            />
          )}
        </View>
      </TouchableHighlight>
    )
  }

  const renderFooter = () => {
    const { theme } = props
    if (loading) {
      return <ActivityIndicator style={{
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
      }} theme={theme} size={'large'} />
    }
    return null
  }

  return (
    <View style={[sharedStyles.container, { backgroundColor: themes[theme].navbarBackground }]} navigation={navigation}>
      <View style={[sharedStyles.contentContainer, {
        flex: 1,
        overflow: 'hidden',
        paddingTop: 5,
        paddingHorizontal: 10,
        backgroundColor: themes[theme].backgroundColor,
      }]}>
        <FlatList
          data={menus}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </View>
      <DialogInput
        isDialogVisible={showDeleteAccount}
        textInputProps={{ secureTextEntry: true }}
        title={I18n.t('del_account_title')}
        message={I18n.t('del_account_text')}
        hintInput={I18n.t('please_enter_password')}
        submitInput={(password) => {
          if (password && password !== '') {
            setShowDeleteAccount(false)
            deleteAccount(password)
          }
        }}
        closeDialog={() => {setShowDeleteAccount(false)}} />
      {renderFooter()}
    </View>
  )

}
const mapStateToProps = state => ({
  user: state.login.user,
})

const mapDispatchToProps = dispatch => ({
  logout: params => dispatch(logoutAction(params)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withTheme(SettingView))
