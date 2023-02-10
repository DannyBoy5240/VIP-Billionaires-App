import { all } from 'redux-saga/effects'
import init from './init'
import login from './login'
import state from './state'
import chat from './chat'

const root = function* root() {
  yield all([init(), login(), state(), chat()])
}

export default root
