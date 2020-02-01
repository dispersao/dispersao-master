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
  createScriptsequenceError,
  SEND_SCRIPTSEQUENCE,
  // updateScriptsequenceLocalState,
} from './actions'

import {
  PLAY_SCRIPT
} from '../scripts/actions'

import {
  getScriptById
} from '../scripts/selectors'

import {
  // getSequenceListNotInScript,
  getSequenceListFormatted
} from '../sequences/selectors'

import {
  getNextRandomSequence
} from '../../utils/randomgenerator'

import {
  createScriptsequence as createScriptsequenceAPI
} from '../api/scriptsequence'

import {
  addListener,
  notify
} from '../../utils/managers/osc'

import {
  onGetScene as getSceneCallback,
  onSceneProgress as sceneProgressCallback,
  onSceneUpdateState as sceneUpdateCallback
} from '../scriptsequences/utils/index'

export function* watchCreateRandomScriptSequence() {
  yield takeLeading(CREATE_RANDOM_SCRIPTSEQUENCE, createRandomScriptSequence)
}

export function* watchCreateScriptSequence() {
  yield takeLeading(CREATE_SCRIPTSEQUENCE, createScriptsequence)
}

export function* watchSendScriptsequence() {
  yield takeEvery(SEND_SCRIPTSEQUENCE, sendScriptsequence)
}

export function* whatchScriptStart() {
  yield takeLeading(PLAY_SCRIPT, createScriptsequencesListeners)
}

function* createRandomScriptSequence(action) {
  try {
    const script = yield select(getScriptById, { id: action.payload.script.script })

    const formatedSequences = yield select(getSequenceListFormatted)
    const nextScriptSequence = yield getNextRandomSequence(script, formatedSequences)
     
    const scriptsequence = yield createScriptsequenceAPI(nextScriptSequence)
    const scriptsequenceData = scriptsequence.entities.scriptsequences
    yield put(createScriptsequenceSuccess(scriptsequenceData))
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

function* sendScriptsequence(action) {
  const scriptsequence = action.payload.scriptsequence
  const sequence = scriptsequence.sequence
  yield call(notify, {
    address: '/scene',
    args: [
      scriptsequence.script,
      sequence.id,
      sequence.sceneNumber, 
      scriptsequence.index, 
      sequence.duration
    ]
  })
}

function* createScriptsequencesListeners() {
  yield call(addListener, '/getScene', onMessageCallback)
  // yield call(addListener, '/sceneProgress', onMessageCallback)
  yield call(addListener, '/updateScene', onMessageCallback)
}

function onMessageCallback(address, message) {
  switch (address) {
    case '/getScene':
      return getSceneCallback(message[0], message[1])
    case '/sceneProgress':
      return sceneProgressCallback(message[0], message[2], message[3])
    case '/updateScene':
      return sceneUpdateCallback(message[0], message[2], message[3], message[4])
  }
}
