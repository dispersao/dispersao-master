import { 
  takeLeading,
  call,
  put
} from 'redux-saga/effects'

import {
  FETCH_PROFILES,
  fetchProfilesSuccess,
  fetchProfilesError
} from './actions'

import {
  fetchContentcreatorsSuccess
} from '../contentcreators/actions'

import {
  fetchProfiles as fetchProfilesAPI
} from '../api/profiles'

const entitiesMap = {
  profiles: fetchProfilesSuccess,
  contentcreators: fetchContentcreatorsSuccess,
}

export function* watchFetchProfiles() {
  yield takeLeading(FETCH_PROFILES, fetchProfiles)
}

function* fetchProfiles() {
  try {
    const { entities } = yield call(fetchProfilesAPI)
    yield mapSuccess(entities)
  } catch (e) {
    fetchProfilesError(e)
  }
}

function* mapSuccess (entities) {
  function* map(key) {
    const action = entitiesMap[key](entities[key])
    try {
      yield put(action)
    } catch (e) {
      console.log(e, key)
    }
  }
  yield* Object.keys(entities).map(map)
}
