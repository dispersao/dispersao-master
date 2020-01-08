import { fromJS } from 'immutable'

import {
  FETCH_COMMENTS_SUCCESS
} from './actions'

const reducer = (state = fromJS({
  data: {},
  error: null
}), action) => {
  switch (action.type) {
    case FETCH_COMMENTS_SUCCESS:
      return state.mergeDeep(fromJS({
        data: action.payload.comments,
        error: null
      })
      )
    default:
      return state
  }
}

export default reducer
