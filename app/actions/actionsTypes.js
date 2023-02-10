const REQUEST = 'REQUEST'
const SUCCESS = 'SUCCESS'
const FAILURE = 'FAILURE'
const defaultTypes = [REQUEST, SUCCESS, FAILURE]

function createRequestTypes(base, types = defaultTypes) {
  const res = {}
  types.forEach(type => (res[type] = `${ base }_${ type }`))
  return res
}

export const APP = createRequestTypes('APP', [
  'START',
  'READY',
  'INIT',
  'INIT_LOCAL_SETTINGS',
  'SET_MASTER_DETAIL',
  'SET_ROUTE',
])
export const APP_STATE = createRequestTypes('APP_STATE', [
  'FOREGROUND',
  'BACKGROUND',
  'INACTIVE',
])

// Login events
export const LOGIN = createRequestTypes('LOGIN', [...defaultTypes, 'RESET'])
export const USER = createRequestTypes('USER', ['SET'])
export const LOGOUT = 'LOGOUT'
export const CART = createRequestTypes('CART', [
  'ADD',
  'REMOVE',
  'CLEAR',
  'CREATE_ORDER',
  'UPDATE_ORDER',
])
export const CHAT = createRequestTypes('CHAT', ['FETCH_UNREAD', 'SET_UNREAD'])
