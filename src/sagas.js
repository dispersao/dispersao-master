import { all } from 'redux-saga/effects'
import { watchConfigFetch } from './modules/config/sagas'
import { 
  watchFetchScripts, 
  watchCreateScript, 
  watchUpdateScript,
  whatchScriptStart
} from './modules/scripts/sagas'
import { watchFetchSequences } from './modules/sequences/sagas'

import { watchCreateRandomScript } from './modules/scriptsequences/sagas'

export default function* rootSaga() {
  yield all([
    watchConfigFetch(),
    watchCreateScript(),
    watchFetchScripts(),
    watchFetchSequences(),
    watchUpdateScript(),
    whatchScriptStart(),
    watchCreateRandomScript()
  ])
}
