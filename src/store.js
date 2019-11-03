import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { routerMiddleware } from 'connected-react-router'
import rootSaga  from './sagas'
import reducer from './reducers'
import history from './routes/history'

const sagaMiddleware = createSagaMiddleware()
const store = createStore(
  reducer,
  applyMiddleware(
    routerMiddleware(history),
    sagaMiddleware
  )
)
sagaMiddleware.run(rootSaga)

export default store
