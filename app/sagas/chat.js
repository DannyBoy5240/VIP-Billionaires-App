import { put, takeLatest, all, select } from 'redux-saga/effects'
import { CHAT } from '../actions/actionsTypes'
import firebaseSdk from '../lib/firebaseSdk'
import { setUnread } from '../actions/chat'

const fetchUnread = function* fetchUnread() {
  const user = yield select(state => state.login.user)
  if (user) {
    const unReads = yield firebaseSdk.getUnReads(user.userId)
    yield put(setUnread(unReads))
  }
}

const root = function* root() {
  yield takeLatest(CHAT.FETCH_UNREAD, fetchUnread)
}
export default root
