import { 
  call, 
  put, 
  takeLeading,
  takeEvery,
  select
} from 'redux-saga/effects'

import {
  CREATE_RANDOM_SCRIPTSEQUENCE
} from './actions'

import {
  getScriptByScriptId
} from '../scripts/selectors'

import {
  getSequenceListNotInScript
} from '../scriptsequences/selectors'

export function* watchCreateRandomScript() {
  yield takeEvery(CREATE_RANDOM_SCRIPTSEQUENCE, createRandomScript)
}

function* createRandomScript(action) {
  // const script = yield select(getScriptByScriptId, { script: action.payload.script.id } )
  // console.log(script)
  // const unplayedSequences = yield select(getSequenceListNotInScript, { script: action.payload.script.id })
  // console.log(script, unplayedSequences)
}
