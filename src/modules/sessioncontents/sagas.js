import {
  put,
  takeEvery,
  select
} from 'redux-saga/effects'

import {
  CREATE_RANDOM_SESSIONCONTENT,
  CREATE_SESSIONCONTENT,
  createSessioncontent as createSessioncontentAction,
  createSessioncontentSuccess,
  createSessioncontentError
} from './actions'

import {
  createSessioncontent as createSessioncontentAPI
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
