import { put, takeLeading, call } from 'redux-saga/effects'
import {
  FETCH_CONFIG,
  fetchConfigSuccess,
  fetchConfigError

} from './actions'

import { fetchConfig } from '../api/config'

function* configFetch() {
  try {
    const data = yield call(fetchConfig)
    yield put(fetchConfigSuccess(data))
  } catch (error) {
    yield put(fetchConfigError(error))
  }
}

export function* watchConfigFetch() {
  yield takeLeading(FETCH_CONFIG, configFetch)
}
