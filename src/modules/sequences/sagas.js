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
    yield put(fetchCategoriesSuccess(entities.entities.categories))
    yield put(fetchTypesSuccess(entities.entities.types))
    yield put(fetchLocationsSuccess(entities.entities.locations))
    yield put(fetchCharactersSuccess(entities.entities.characters))
    yield put(fetchPartsSuccess(entities.entities.parts))
    yield put(fetchSequencesSuccess(entities.entities.sequences))
  } catch (e) {
    yield put(fetchSequencesError(e))
  }
}
