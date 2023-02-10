import { combineReducers } from 'redux'
import app from './app'
import login from './login'
import cart from './cart'
import chat from './chat'

export default combineReducers({
  app,
  login,
  cart,
  chat,
})
