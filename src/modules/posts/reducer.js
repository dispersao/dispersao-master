import { fromJS } from 'immutable'

import {
  FETCH_POSTS_SUCCESS
} from './actions'

const reducer = (state = fromJS({
  data: {},
  error: null
}), action) => {
  switch (action.type) {
    case FETCH_POSTS_SUCCESS:
      return state.mergeDeep(fromJS({
        data: action.payload.posts,
        error: null
      })
      )
    default:
      return state
  }
}

export default reducer
