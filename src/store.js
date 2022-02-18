import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { routerMiddleware } from 'connected-react-router'
import rootSaga from './sagas'
import reducer from './reducers'
import history from './routes/history'
const composeEnhancers =
  (process.env.NODE_ENV === 'development' &&
    window?.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose

const sagaMiddleware = createSagaMiddleware()
const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(routerMiddleware(history), sagaMiddleware))
)
sagaMiddleware.run(rootSaga)

export default store
