import { takeLatest, select, put } from 'redux-saga/effects'
import { APP_STATE } from '../actions/actionsTypes'
import { ROOT_INSIDE, ROOT_VERIFY_EMAIL } from '../actions/app'
import firebase from '@react-native-firebase/app'
import firebaseSdk from '../lib/firebaseSdk'
import { loginSuccess } from '../actions/login'
import { fetchUnread } from '../actions/chat'

const appHasComeBackToForeground = function* appHasComeBackToForeground() {
  const appRoot = yield select(state => state.app.root)
  if (appRoot === ROOT_VERIFY_EMAIL) {
    yield firebase.auth().currentUser.reload()
    if (firebase.auth().currentUser.emailVerified) {
      const userInfo = yield firebaseSdk.getUser(
        firebase.auth().currentUser.uid,
      )
      yield put(loginSuccess({ ...userInfo, emailVerified: true }))
    }
  } else if (appRoot === ROOT_INSIDE) {
    yield put(fetchUnread())
  }
}

const appHasComeBackToBackground = function* appHasComeBackToBackground() {}

const appHasInActive = function* appHasInActive() {}

const root = function* root() {
  yield takeLatest(APP_STATE.FOREGROUND, appHasComeBackToForeground)
  yield takeLatest(APP_STATE.BACKGROUND, appHasComeBackToBackground)
  yield takeLatest(APP_STATE.INACTIVE, appHasInActive)
}

export default root
