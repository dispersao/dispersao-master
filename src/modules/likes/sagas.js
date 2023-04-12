import { race, takeLeading, call, put, delay, take, select } from 'redux-saga/effects'

import {
  FETCH_LIKES,
  fetchLikesSuccess,
  fetchLikesError,
  STOP_FETCH_LIKES,
  stopFetchLikes
} from './actions'

import { fetchSessioncontentLikes } from '../api/likes'
import { getCurrentScriptPublishedSessioncontentsIds } from '../sessioncontents/selectors'

const FETCH_LIKES_DELAY = 10000

export function* watchPollFetchLikes() {
  yield takeLeading(FETCH_LIKES, pollFetchLikes)
}

function* pollFetchLikes({ payload }) {
  yield race([call(fetchLikes, payload), take(STOP_FETCH_LIKES)])
}

function* fetchLikes({ sessioncontent }) {
  while (true) {
    try {
      const sessioncontents = yield select(
        getCurrentScriptPublishedSessioncontentsIds
      )
      const likes = yield* fetchLikesPerSessioncontent(sessioncontents?.toJS())
      yield put(fetchLikesSuccess(likes))
      yield delay(FETCH_LIKES_DELAY)
    } catch (err) {
      console.log(err)
      yield put(fetchLikesError(err))
      yield put(stopFetchLikes(sessioncontent))
    }
  }
}

function* fetchLikesPerSessioncontent(sessioncontents = []) {
  let likes = {}
  yield* sessioncontents.map(function*(sessioncontent) {
    const likeEntitites =  yield fetchSessioncontentLikes({sessioncontent})
    likes = {
      ...likes,
      ...likeEntitites.entities
    }
  })
  return likes
}
