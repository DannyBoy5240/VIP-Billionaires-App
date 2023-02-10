import { testSaga, expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';
import AsyncStorage from '@react-native-async-storage/async-storage'


import { restore } from '../../sagas/init';
import login, { initialState } from '../../reducers/login';
import { CURRENT_USER } from '../../constants/keys';
import firebaseSdk from '../../lib/firebaseSdk';
import { appReady, appStart, ROOT_LOADING, ROOT_OUTSIDE } from '../../actions/app';
import { loginSuccess } from '../../actions/login';

describe('sagas test: restore', () => {
  /** Integrate Testing ** */
  const user = { name: '' };
  const auth = { uid: 1, emailVerified: true };
  const userInfo = { id: 1 };
  const finalUser = { ...userInfo, emailVerified: auth.emailVerified };
  it('integration test', () => expectSaga(restore)
    .withReducer(login)
    .provide([
      [matchers.call.fn(AsyncStorage.getItem, CURRENT_USER), user],
      [matchers.call.fn(firebaseSdk.authorizedUser), auth],
      [matchers.call.fn(firebaseSdk.getUser), userInfo],
    ])
    // .put(loginSuccess(finalUser))
    .put(appStart({ root: ROOT_OUTSIDE }))
    .put(appReady({}))
    .hasFinalState({
      ...initialState,
      // user: finalUser,
    })
    .run());

  /** Unit Testing ** */
  // it('unit test', () => {
  //   testSaga(restore)
  //     .next()
  //     .call(AsyncStorage.getItem, CURRENT_USER)
  //     .next(user)
  //     .call(firebaseSdk.authorizedUser)
  //     .next(auth)
  //     .call(firebaseSdk.getUser, auth.uid)
  //     .save('Restore Point 1')
  //     .next(userInfo)
  //     .call(AsyncStorage.setItem, CURRENT_USER, JSON.stringify(user))
  //     .next()
  //     .put(loginSuccess(user))
  //     .next()
  //     .isDone()
  //     .restore('Restore Point 1')
  //     .next()
  //     .next({ status: 200, data: data2 })
  //     .call(AsyncStorage.removeItem, CURRENT_USER)
  //     .next()
  //     .put(appStart({ root: ROOT_OUTSIDE }))
  //     .next()
  //     .put(appReady({}))
  //     .isDone()
  // });
});
