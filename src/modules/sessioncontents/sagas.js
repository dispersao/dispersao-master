import {
  put,
  takeEvery,
  takeLeading,
  select
} from 'redux-saga/effects'

import {
  CREATE_RANDOM_SESSIONCONTENT,
  CREATE_SESSIONCONTENT,
  UPDATE_SESSIONCONTENT,
  UPDATE_SESSIONCONTENT_STATE,
  createSessioncontent as createSessioncontentAction,
  createSessioncontentSuccess,
  createSessioncontentError,
  updateSessioncontentSuccess,
  updateSessioncontentError,
  updateSessioncontentStateSuccess,
  updateSessioncontentStateError
} from './actions'

import {
  createSessioncontent as createSessioncontentAPI,
  updateSessioncontent as updateSessioncontentAPI,
  updateSessionContentState as updateSessionContentStateAPI
} from '../api/sessioncontent'

import {
  getScriptById
} from '../scripts/selectors'

import {
  getPostsListFormatted
} from '../posts/selectors'

import {
  getCommentsListFormatted
} from '../comments/selectors'

import {
  getNextRandomContent
} from '../../utils/randomgenerator/'

export function* watchCreateRandomSessioncontent() {
  yield takeEvery(CREATE_RANDOM_SESSIONCONTENT, createRandomSessioncontent)
}

export function* watchCreateSessioncontent() {
  yield takeEvery(CREATE_SESSIONCONTENT, createSessioncontent)
}

export function* watchUpdateSessioncontent() {
  yield takeLeading(UPDATE_SESSIONCONTENT, updateSessioncontent)
  yield takeLeading(UPDATE_SESSIONCONTENT_STATE, updateSessionContentState)
}

function* createRandomSessioncontent(action) {
  try {
    const script = yield select(getScriptById, { id: action.payload.script.script })
    const formatedPosts = yield select(getPostsListFormatted)
    const formatedComents = yield select(getCommentsListFormatted)
    const nextContent = yield getNextRandomContent(script, formatedPosts, formatedComents)
    if (nextContent.length) {
      console.log('next App Content', nextContent)
      yield put (createSessioncontentAction(nextContent))
    }
  } catch (e) {
    console.log(e)
  }
}

function* createSessioncontent(action) {
  try {
    const sessioncontents = yield createSessioncontentAPI(action.payload.sessioncontents)
    const sessioncontentsData = sessioncontents.entities.sessioncontents
    yield put(createSessioncontentSuccess(sessioncontentsData))
  } catch (e) {
    console.log(e)
    yield put(createSessioncontentError(e))
  }
}

function* updateSessioncontent(action) {
  try {
    const sessioncontents = yield updateSessioncontentAPI(action.payload.sessioncontents)
    const sessioncontentsData = sessioncontents.entities.sessioncontents
    yield put(updateSessioncontentSuccess(sessioncontentsData))
  } catch (e) {
    console.log(e)
    yield put(updateSessioncontentError(e))
  }
}
function* updateSessionContentState(action) {
  try {
    const sessioncontents = yield updateSessionContentStateAPI(action.payload.sessioncontents)
    const sessioncontentsData = sessioncontents.entities.sessioncontents
    yield put(updateSessioncontentStateSuccess(sessioncontentsData))

  } catch (e) {
    console.log(e)
    yield put(updateSessioncontentStateError(e))
  }
}
