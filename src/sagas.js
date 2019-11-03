import { all } from 'redux-saga/effects'
import { watchConfigFetch } from './modules/config/sagas'
import { watchFetchScripts, watchCreateScript } from './modules/scripts/sagas'
import { watchFetchSequences } from './modules/sequences/sagas'

export default function* rootSaga() {
  yield all([
    watchConfigFetch(),
    watchCreateScript(),
    watchFetchScripts(),
    watchFetchSequences()
  ])
}
