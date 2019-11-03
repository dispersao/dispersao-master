import { 
  call, 
  put, 
  takeLeading 
} from 'redux-saga/effects'

import {
  FETCH_SEQUENCES,
  fetchSequencesSuccess,
  fetchSequencesError,
  
} from './actions'

import { 
  fetchSequences as fetchSequencesAPI 
} from '../api/sequences'

export function* watchFetchSequences() {
  yield takeLeading(FETCH_SEQUENCES, fetchSequences)
}

function* fetchSequences () {
  try {
    const sequences = yield call(fetchSequencesAPI)
    yield put(fetchSequencesSuccess(sequences))
  } catch (e) {
    yield put(fetchSequencesError(e))
  }
}
