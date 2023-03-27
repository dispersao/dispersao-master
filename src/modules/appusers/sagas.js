import {
  race,
  takeLeading,
  take,
  call,
  put,
  delay
} from 'redux-saga/effects'
import { fetchAppusersTotal as fetchAppusersTotalAPI } from '../api/appusers'
import { getCurrentScriptId } from '../scripts/selectors'
import {
  FETCH_APPUSERS,
  STOP_FETCH_APPUSERS,
  fetchAppUsersSuccess,
  fetchAppusersError,
  stopFetchAppusers
} from './actions'

const FETCH_APP_USER_DELAY = 10000

export function* watchPollFetchAppUsers() {
  yield takeLeading(FETCH_APPUSERS, pollFetchAppusers)
  
}

function* pollFetchAppusers({ payload }) {
  yield race([call(pollAppUsers, payload), take(STOP_FETCH_APPUSERS)])
}

function* pollAppUsers({ script }) {
  while (true) {
    try {
      const total = yield fetchAppusersTotalAPI({ script })
      yield put(fetchAppUsersSuccess({script, total}))
      yield delay(FETCH_APP_USER_DELAY)
    } catch (err) {
      console.log(err)
      yield put(fetchAppusersError(err))
      yield put(stopFetchAppusers())
    }
  }
}
