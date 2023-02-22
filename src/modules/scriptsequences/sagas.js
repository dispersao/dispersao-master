import {
  call,
  put,
  takeLeading,
  takeEvery,
  select,
  takeLatest,
  all
} from 'redux-saga/effects'

import {
  CREATE_RANDOM_SCRIPTSEQUENCE,
  CREATE_SCRIPTSEQUENCE,
  createScriptsequence as createScriptsequenceAction,
  createScriptsequenceSuccess,
  createScriptsequenceError,
  SEND_SCRIPTSEQUENCE,
  UPDATE_SCRIPTSEQUENCE,
  updateScriptsequences as updateScriptsequencesAction,
  updateScriptsequenceSuccess,
  updateScriptsequenceError,
  BULKUPDATE_SCRIPTSEQUENCE,
  bulkupdateScriptsequence as bulkupdateScriptsequenceAction,
  bulkupdateScriptsequenceSuccess,
  bulkupdateScriptsequenceError,
  DELETE_SCRIPTSEQUENCE,
  deleteScriptsequence as deleteScriptsequenceAction,
  deleteScriptsequenceSuccess,
  deleteScriptsequenceError,
  CREATE_UPDATE_DELETE_SCRIPTSEQUENCES,
  createUpdateDeleteScriptsequencesSuccess,
  createUpdateDeleteScriptsequencesError
  // updateScriptsequenceLocalState,
} from './actions'

import { PLAY_SCRIPT } from '../scripts/actions'

import { getScriptById } from '../scripts/selectors'

import {
  getSequenceListFormatted
} from '../sequences/selectors'

import { getNextRandomSequence } from '../../utils/randomgenerator'

import {
  createScriptsequence as createScriptsequenceAPI,
  updateScriptsequence as updateScriptsequenceAPI,
  bulkUpdateScriptsequence as bulkUpdateScriptsequenceAPI,
  deleteScriptsequence as deleteScriptsequenceAPI
} from '../api/scriptsequence'

import { addListener, notify } from '../../utils/managers/osc'

import {
  onGetScene as getSceneCallback,
  onSceneProgress as sceneProgressCallback,
  onSceneUpdateState as sceneUpdateCallback
} from '../scriptsequences/utils/index'

export function* watchCreateRandomScriptSequence() {
  yield takeLeading(CREATE_RANDOM_SCRIPTSEQUENCE, createRandomScriptSequence)
}

export function* watchUpdateScriptsequence() {
  yield takeLeading(UPDATE_SCRIPTSEQUENCE, updateScriptsequence)
  yield takeLatest(BULKUPDATE_SCRIPTSEQUENCE, bulkUpdateScriptsequence)
  yield takeEvery(
    CREATE_UPDATE_DELETE_SCRIPTSEQUENCES,
    createUpdateScriptsequences
  )
}

export function* watchDeleteScriptsequence() {
  yield takeLeading(DELETE_SCRIPTSEQUENCE, deleteScriptsequence)
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
    const script = yield select(getScriptById, {
      id: action.payload.script.script
    })

    const formatedSequences = yield select(getSequenceListFormatted)
    const nextScriptSequence = yield getNextRandomSequence(
      script,
      formatedSequences
    )

    const scriptsequence = yield createScriptsequenceAPI(nextScriptSequence)
    const scriptsequenceData = scriptsequence.entities.scriptsequences
    yield put(createScriptsequenceSuccess(scriptsequenceData))
  } catch (e) {
    console.log(e)
  }
}

function* createUpdateScriptsequences(action) {
  try {
    yield all({
      create: action.payload.create
        ? call(
            createScriptsequence,
            createScriptsequenceAction(action.payload.create)
          )
        : true,
      delete: action.payload.delete
        ? call(
            deleteScriptsequence,
            deleteScriptsequenceAction(action.payload.delete)
          )
        : true,
      update: action.payload.update?.length
        ? call(
            bulkUpdateScriptsequence,
            bulkupdateScriptsequenceAction(action.payload.update)
          )
        : true
    })
    yield put(createUpdateDeleteScriptsequencesSuccess())
  } catch (e) {
    console.log(e)
    yield put(createUpdateDeleteScriptsequencesError(e))
  }
}

function* createScriptsequence(action) {
  try {
    const scriptsequence = yield createScriptsequenceAPI(
      action.payload.scriptsequence
    )
    const scriptsequenceData = scriptsequence.entities.scriptsequences
    yield put(createScriptsequenceSuccess(scriptsequenceData))
  } catch (e) {
    console.log(e)
    yield put(createScriptsequenceError(e))
  }
}

function* updateScriptsequence(action) {
  try {
    const scriptsequence = yield updateScriptsequenceAPI(
      action.payload.scriptsequence
    )
    const scriptsequenceData = scriptsequence.entities.scriptsequences
    yield put(updateScriptsequenceSuccess(scriptsequenceData))
  } catch (e) {
    yield put(updateScriptsequenceError(e))
  }
}

function* bulkUpdateScriptsequence(action) {
  try {
    const scriptsequences = yield bulkUpdateScriptsequenceAPI(
      action.payload.scriptsequences
    )
    const scriptsequenceData = scriptsequences.entities.scriptsequences
    yield put(bulkupdateScriptsequenceSuccess(scriptsequenceData))
  } catch (e) {
    console.log(e)
    yield put(bulkupdateScriptsequenceError(e))
  }
}

function* deleteScriptsequence(action) {
  try {
    const scriptsequences = yield deleteScriptsequenceAPI(
      action.payload.scriptsequence
    )
    yield put(
      deleteScriptsequenceSuccess(scriptsequences.entities.scriptsequences)
    )
  } catch (e) {
    console.log(e)
    yield put(deleteScriptsequenceError(e))
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
