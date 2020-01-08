import { 
  takeLeading,
  call,
  put
} from 'redux-saga/effects'

import {
  FETCH_POSTS,
  fetchPostsSuccess,
  fetchPostsError
} from './actions'

import {
  fetchCommentsSuccess
} from '../comments/actions'

import {
  fetchContentcreatorsSuccess
} from '../contentcreators/actions'

import { 
  fetchCategoriesSuccess 
} from '../categories/actions'


import {
  fetchPosts as fetchPostsAPI
} from '../api/posts'

const entitiesMap = {
  posts: fetchPostsSuccess,
  comments: fetchCommentsSuccess,
  contentcreators: fetchContentcreatorsSuccess,
  categories: fetchCategoriesSuccess
}

export function* watchFetchPosts() {
  yield takeLeading(FETCH_POSTS, fetchPosts)
}

function* fetchPosts() {
  try {
    const entities = yield call(fetchPostsAPI)
    yield mapSuccess(entities.entities)
  } catch (e) {
    fetchPostsError(e)
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
