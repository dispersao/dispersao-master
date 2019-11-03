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
    yield put(fetchScriptsSuccess(scripts))
  } catch (e) {
    yield put(fetchScriptsError(e))
  }
}

function* createScript() {
  try {
    const script = yield call(createScriptAPI)
    yield put(createScriptSuccess(script))
    yield put(push(`/scripts/${script.id}`))
  } catch (e) {
    yield put(createScriptError(e))
  }
}
