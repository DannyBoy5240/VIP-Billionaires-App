import {put, takeLatest} from 'redux-saga/effects';
import * as types from '../actions/actionsTypes';
import {setUser} from '../actions/login';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CURRENT_USER} from '../constants/keys';
import firebaseSdk from '../lib/firebaseSdk';
import {
  appStart,
  ROOT_INSIDE,
  ROOT_OUTSIDE,
  ROOT_THANK_YOU,
  ROOT_SIGNUP_PROFILE,
  ROOT_VERIFY_EMAIL,
} from '../actions/app';
import {fetchUnread} from '../actions/chat';

const handleLoginSuccess = function* handleLoginSuccess({data}) {
  yield put(setUser(data));
  try {
    yield firebaseSdk.setFcmToken(data.id);
  } catch (e) {}

  if (!data.emailVerified) {
    yield put(appStart({root: ROOT_VERIFY_EMAIL}));
  } else if (!data.approved) {
    yield put(appStart({root: ROOT_SIGNUP_PROFILE}));
  } else {
    yield put(fetchUnread());
    yield put(appStart({root: ROOT_INSIDE}));
  }
};

const handleLogout = function* handleLogout() {
  yield AsyncStorage.removeItem(CURRENT_USER);
  yield firebaseSdk.signOut();
  yield put(appStart({root: ROOT_OUTSIDE}));
};

const handleSetUser = function* handleSetUser({user}) {};

const root = function* root() {
  yield takeLatest(types.LOGIN.SUCCESS, handleLoginSuccess);
  yield takeLatest(types.LOGOUT, handleLogout);
  yield takeLatest(types.USER.SET, handleSetUser);
};
export default root;
