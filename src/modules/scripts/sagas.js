import { call, put, takeLeading, takeEvery, select } from 'redux-saga/effects'

import { push } from 'connected-react-router'

import {
  FETCH_SCRIPTS,
  fetchScriptsSuccess,
  fetchScriptsError,
  CREATE_SCRIPT,
  createScriptSuccess,
  createScriptError,
  UPDATE_SCRIPT,
  // updateScriptLocalState,
  updateScriptSuccess,
  updateScriptError,
  START_SESSION,
  RESET_SESSION,
  PLAY_SCRIPT,
  CONNECT_SCRIPT,
  connectScriptSuccess,
  connectScriptError,
  PAUSE_SCRIPT,
  FINISH_SCRIPT
} from './actions'

import { fetchScriptsequencesSuccess } from '../scriptsequences/actions'

import {
  fetchSessioncontentsSuccess,
  createSessioncontentSuccess
} from '../sessioncontents/actions'

import {
  createScript as createScriptAPI,
  fetchScripts as fetchScriptsAPI,
  updateScript as updateScriptAPI,
  updateStateScript as updateStateScriptAPI
} from '../api/script'

import { sendMessage, notify } from '../../utils/managers/osc'

import { getScriptByScriptId } from './selectors'

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
  yield takeEvery(START_SESSION, startSession)
  yield takeEvery(RESET_SESSION, resetSession)
  yield takeEvery(PLAY_SCRIPT, playScript)
  yield takeEvery(PAUSE_SCRIPT, pauseScript)
  yield takeEvery(FINISH_SCRIPT, finishScript)
}

function* fetchScripts() {
  try {
    const entities = yield call(fetchScriptsAPI)

    let { scripts, scriptsequences, sessioncontents } = { ...entities.entities }
    yield put(fetchScriptsequencesSuccess(scriptsequences || []))
    yield put(fetchScriptsSuccess(scripts || []))
    yield put(fetchSessioncontentsSuccess(sessioncontents || []))
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

function* updateScriptState(action) {
  try {
    const script = yield call(updateStateScriptAPI, action.payload.script)
    const scriptData = script.entities.scripts
    const sessioncontentsData = script.entities.sessioncontents || []
    yield put(createSessioncontentSuccess(sessioncontentsData))
    yield put(updateScriptSuccess(scriptData))
  } catch (e) {
    console.log(e)
    yield put(updateScriptError(e))
  }
}

function* resetSession(action) {
  try {
    yield updateScriptState(action)

    yield call(notify, {
      address: '/resetsession',
      args: [action.payload.script.id]
    })
  } catch (e) {
    console.log(e)
  }
}

function* startSession(action) {
  try {
    yield updateScriptState(action)
    const script = yield select(getScriptByScriptId, {
      script: action.payload.script.id
    })
    yield call(notify, {
      address: '/session',
      args: [action.payload.script.id, script.get('token')]
    })
  } catch (e) {
    console.log(e)
  }
}

function* playScript(action) {
  try {
    yield updateScriptState(action)
    yield call(notify, {
      address: '/play',
      args: [action.payload.script.id, action.payload.script.speed]
    })
  } catch (e) {
    console.log(e)
  }
}

function* pauseScript(action) {
  try {
    yield updateScripts(action)
    yield call(notify, {
      address: '/pause',
      args: [action.payload.script.id]
    })
  } catch (e) {
    console.log(e)
  }
}

function* finishScript(action) {
  try {
    yield updateScripts(action)
    yield call(notify, {
      address: '/finish',
      args: [action.payload.script.id]
    })
  } catch (e) {
    console.log(e)
  }
}

function* connectScript(action) {
  try {
    yield call(
      sendMessage,
      {
        address: '/connect',
        args: [action.payload.script.id]
      },
      {
        address: '/connected'
      }
    )
    yield put(connectScriptSuccess(action.payload.script))
  } catch (e) {
    console.log(e)
    yield put(
      connectScriptError({
        ...action.payload.script,
        error: e
      })
    )
  }
}
