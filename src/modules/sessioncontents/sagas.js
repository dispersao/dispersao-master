import {
  call,
  put,
  takeLeading,
  takeEvery,
  select
} from 'redux-saga/effects'

import {
  CREATE_RANDOM_SESSIONCONTENT
} from './actions'

import {
  getScriptById
} from '../scripts/selectors'

import {
  getPostsListFormatted
} from '../posts/selectors'

import {
  getCommentsListFormatted
} from '../comments/selectors'

export function* watchCreateRandomsessioncontent() {
  yield takeEvery(CREATE_RANDOM_SESSIONCONTENT, createRandomSessioncontent)
}

function* createRandomSessioncontent(action) {
  try {
    const script = yield select(getScriptById, { id: action.payload.script.script })
    const formatedPosts = yield select(getPostsListFormatted)
    const formatedComents = yield select(getCommentsListFormatted)
    console.log(script, formatedPosts, formatedComents, script.getIn(['scriptsequences', script.get('scriptsequences').size - 1, 'position']))
    // const nextScriptSequence = yield getNextRandomSequence(script, formatedSequences)
    // yield put(createScriptsequenceAction(nextScriptSequence))

  } catch (e) {
    console.log(e)
  }
}
