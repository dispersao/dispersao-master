import { 
  call, 
  put, 
  takeLeading,
  takeEvery,
  select
} from 'redux-saga/effects'

import {
  CREATE_RANDOM_SCRIPTSEQUENCE,
  CREATE_SCRIPTSEQUENCE,
  createScriptsequence as createScriptsequenceAction,
  createScriptsequenceSuccess,
  createScriptsequenceError
} from './actions'

import {
  getScriptById
} from '../scripts/selectors'

import {
  getSequenceListNotInScript
} from '../sequences/selectors'

import {
  getNextRandomSequence
} from './utils/randomgenerator'

import {
  createScriptsequence as createScriptsequenceAPI
} from '../api/scriptsequence'

export function* watchCreateRandomScriptSequence() {
  yield takeEvery(CREATE_RANDOM_SCRIPTSEQUENCE, createRandomScriptSequence)
}

export function* watchCreateScriptSequence() {
  yield takeEvery(CREATE_SCRIPTSEQUENCE, createScriptsequence)
}

function* createRandomScriptSequence(action) {
  try {
    const script = yield select(getScriptById, { id: action.payload.script.script })
    const unplayedSequences = yield select(getSequenceListNotInScript, {
      script: action.payload.script.script,
      scriptsequences: script.get('scriptsequences').toJS()
    })
    const nextScriptSequence = yield getNextRandomSequence(script, unplayedSequences)
    yield put(createScriptsequenceAction(nextScriptSequence))
  } catch (e) {
    console.log(e)
  }
}

function* createScriptsequence(action) {
  try {
    const scriptsequence = yield createScriptsequenceAPI(action.payload.scriptsequence)
    const scriptsequenceData = scriptsequence.entities.scriptsequences
    yield put(createScriptsequenceSuccess(scriptsequenceData))
  } catch  (e) {
    yield put(createScriptsequenceError(e))
  }
}
