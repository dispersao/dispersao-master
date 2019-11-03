import { 
  call, 
  put, 
  takeLeading 
} from 'redux-saga/effects'

import { push } from 'connected-react-router'

import {
  FETCH_SCRIPTS,
  fetchScriptsSuccess,
  fetchScriptsError,
  CREATE_SCRIPT,
  createScriptSuccess,
  createScriptError
} from './actions'

import { 
  createScript as createScriptAPI,
  fetchScripts as fetchScriptsAPI 
} from '../api/script'

export function* watchFetchScripts() {
  yield takeLeading(FETCH_SCRIPTS, fetchScripts)
}

export function* watchCreateScript() {
  yield takeLeading(CREATE_SCRIPT, createScript)
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
    const script = yield call(createScriptAPI, action.payload)
    const scriptData = script.entities.scripts
    yield put(createScriptSuccess(scriptData))
    yield put(push(`/scripts/${Object.values(scriptData)[0].id}`))
  } catch (e) {
    yield put(createScriptError(e))
  }
}
