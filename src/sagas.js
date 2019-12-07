import { all } from 'redux-saga/effects'
import { watchConfigFetch } from './modules/config/sagas'
import { 
  watchFetchScripts, 
  watchCreateScript, 
  watchUpdateScript,
  whatchScriptStart
} from './modules/scripts/sagas'
import { watchFetchSequences } from './modules/sequences/sagas'

import { 
  watchCreateRandomScriptSequence,
  watchCreateScriptSequence,
  whatchScriptStart as whatchScriptStartFromScriptsequence,
  watchSendScriptsequence
} from './modules/scriptsequences/sagas'

export default function* rootSaga() {
  yield all([
    watchConfigFetch(),
    watchCreateScript(),
    watchFetchScripts(),
    watchFetchSequences(),
    watchUpdateScript(),
    whatchScriptStartFromScriptsequence(),
    watchSendScriptsequence(),
    whatchScriptStart(),
    watchCreateRandomScriptSequence(),
    watchCreateScriptSequence()
  ])
}
