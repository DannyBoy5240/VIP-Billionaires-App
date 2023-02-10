import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import reducers from '../reducers'
import sagas from '../sagas'
import applyAppStateMiddleware from './appStateMiddleware'
import { composeWithDevTools } from 'redux-devtools-extension'

const sagaMiddleware = createSagaMiddleware()
let enhancers

if (__DEV__) {
  enhancers = compose(
    applyAppStateMiddleware(),
    composeWithDevTools(applyMiddleware(sagaMiddleware)),
    applyMiddleware(sagaMiddleware),
  )
} else {
  enhancers = compose(
    applyAppStateMiddleware(),
    applyMiddleware(sagaMiddleware),
  )
}

const store = createStore(reducers, enhancers)
sagaMiddleware.run(sagas)

export default store
