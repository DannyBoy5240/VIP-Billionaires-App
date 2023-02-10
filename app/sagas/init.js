import { put, takeLatest } from 'redux-saga/effects'
import { APP } from '../actions/actionsTypes'
import { appReady, appStart, ROOT_INTRO, ROOT_OUTSIDE } from '../actions/app'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { CURRENT_USER } from '../constants/keys'
import firebaseSdk from '../lib/firebaseSdk'
import { loginSuccess } from '../actions/login'

export const restore = function* restore() {
  const user = yield AsyncStorage.getItem(CURRENT_USER)
  const auth = yield firebaseSdk.authorizedUser()
  const isShowIntro = yield AsyncStorage.getItem('isShowIntro')
  if (auth && user) {
    const userInfo = yield firebaseSdk.getUser(auth.uid)
    if (userInfo && userInfo.id) {
      const user = { ...userInfo, emailVerified: auth.emailVerified }
      yield AsyncStorage.setItem(CURRENT_USER, JSON.stringify(user))
      yield put(appReady({}))
      yield put(loginSuccess(user))
    } else {
      yield AsyncStorage.removeItem(CURRENT_USER)
    }
  } else if (isShowIntro) {
    yield put(appStart({ root: ROOT_OUTSIDE }))
  } else {
    yield put(appStart({ root: ROOT_INTRO }))
  }
}

const start = function* start() {}

const ready = function* start() {
  yield AsyncStorage.setItem('isShowIntro', JSON.stringify(true))
  yield put(appStart({ root: ROOT_OUTSIDE }))
}

const root = function* root() {
  yield takeLatest(APP.INIT, restore)
  yield takeLatest(APP.START, start)
  yield takeLatest(APP.READY, ready)
}
export default root
