import { 
  call, 
  put, 
  takeLeading,
  takeEvery
} from 'redux-saga/effects'

import { push } from 'connected-react-router'

import {
  FETCH_SCRIPTS,
  fetchScriptsSuccess,
  fetchScriptsError,
  CREATE_SCRIPT,
  createScriptSuccess,
  createScriptError,
  UPDATE_SCRIPT,
  updateScriptSuccess,
  updateScriptError
} from './actions'

import { 
  createScript as createScriptAPI,
  fetchScripts as fetchScriptsAPI,
  updateScript as updateScriptAPI
} from '../api/script'

export function* watchFetchScripts() {
  yield takeLeading(FETCH_SCRIPTS, fetchScripts)
}

export function* watchCreateScript() {
  yield takeLeading(CREATE_SCRIPT, createScript)
}

export function* watchUpdateScript() {
  yield takeEvery(UPDATE_SCRIPT, updateScript)
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

function* updateScript(action) {
  try {
    const script = yield call(updateScriptAPI, action.payload.script)
    const scriptData = script.entities.scripts
    yield put(updateScriptSuccess(scriptData))
  } catch (e) {
    yield put(updateScriptError(e))
  }
}
