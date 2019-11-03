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

import { fetchCategoriesSuccess } from '../categories/actions'
import { fetchCharactersSuccess } from '../characters/actions'
import { fetchLocationsSuccess } from '../locations/actions'
import { fetchPartsSuccess } from '../parts/actions'
import { fetchTypesSuccess } from '../types/actions'

const entitiesMap = {
  sequences: fetchSequencesSuccess,
  categories: fetchCategoriesSuccess,
  characters: fetchCharactersSuccess,
  locations: fetchLocationsSuccess,
  types: fetchTypesSuccess,
  parts: fetchPartsSuccess
}

export function* watchFetchSequences() {
  yield takeLeading(FETCH_SEQUENCES, fetchSequences)
}

function* fetchSequences () {
  try {
    const entities = yield call(fetchSequencesAPI)
    yield mapSuccess(entities.entities)
  } catch (e) {
    yield put(fetchSequencesError(e))
  }
}

function* mapSuccess (entities) {
  function* map(key) {
    const action = entitiesMap[key](entities[key])
    yield put(action)
  }
  yield* Object.keys(entities).map(map)
}
