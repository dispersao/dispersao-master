import { 
  call, 
  put, 
  takeLeading,
  takeEvery,
  select
} from 'redux-saga/effects'

import osc from 'osc/dist/osc-browser'
import { push } from 'connected-react-router'

import {
  FETCH_SCRIPTS,
  fetchScriptsSuccess,
  fetchScriptsError,
  CREATE_SCRIPT,
  createScriptSuccess,
  createScriptError,
  UPDATE_SCRIPT,
  updateScript,
  updateScriptSuccess,
  updateScriptError,
  START_SCRIPT,
  CONNECT_SCRIPT,
  connectScriptSuccess,
  connectScriptError
  // PAUSE_SCRIP
} from './actions'

import { 
  createScript as createScriptAPI,
  fetchScripts as fetchScriptsAPI,
  updateScript as updateScriptAPI
} from '../api/script'

import { sendOscMessagewithCallback } from './managers/osc'

export function* watchFetchScripts() {
  yield takeLeading(FETCH_SCRIPTS, fetchScripts)
}

export function* watchCreateScript() {
  yield takeLeading(CREATE_SCRIPT, createScript)
}

export function* watchUpdateScript() {
  yield takeEvery(UPDATE_SCRIPT, updateScripts)
}

export function* whatchScriptStart() {
  yield takeEvery(CONNECT_SCRIPT, connectScript)
  yield takeEvery(START_SCRIPT, startScript)
}

function* fetchScripts () {
  try {
    const scripts = yield call(fetchScriptsAPI)
    yield put(fetchScriptsSuccess(scripts.entities.scripts || []))
  } catch (e) {
    yield put(fetchScriptsError(e))
  }
}

function* createScript(action) {
  try {
    const script = yield call(createScriptAPI, action.payload.script)
    const scriptData = script.entities.scripts
    yield put(createScriptSuccess(scriptData))
    yield put(push(`/scripts/${Object.values(scriptData)[0].id}`))
  } catch (e) {
    yield put(createScriptError(e))
  }
}

function* updateScripts(action) {
  try {
    const script = yield call(updateScriptAPI, action.payload.script)
    const scriptData = script.entities.scripts
    yield put(updateScriptSuccess(scriptData))
  } catch (e) {
    yield put(updateScriptError(e))
  }
}

function* startScript(action) {
  try {
    yield put(updateScript({
      id: action.payload.script, 
      isPlaying:true
    }))
    // yield call(sendOscMessage, 'start', [action.payload.script])
  } catch (e) {
    console.log(e)
  }
}

function* connectScript(action) {
  try {
    yield call(sendOscMessagewithCallback, {
      address: '/connect', 
      args: [action.payload.script.id]
    }, {
      address: '/connected'
    })
    yield put(connectScriptSuccess(action.payload.script ))
  } catch (e) {
    console.log(e)
    yield put(connectScriptError({
      ...action.payload.script,
      error: e
    }))
  }
}
