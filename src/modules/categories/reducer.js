import { fromJS } from 'immutable'

import {
  FETCH_CATEGORIES_SUCCESS
} from './actions'

const reducer = (state = fromJS({
  data: {},
  error: null
}), action) => {
  switch (action.type) {
    case FETCH_CATEGORIES_SUCCESS:
      return state.mergeDeep(fromJS({
        data: action.payload.locations
      })
      )
    default:
      return state
  }
}

export default reducer
