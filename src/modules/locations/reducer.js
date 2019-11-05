import { fromJS } from 'immutable'

import {
  FETCH_LOCATIONS_SUCCESS
} from './actions'

const reducer = (state = fromJS({
  data: {},
  error: null
}), action) => {
  switch (action.type) {
    case FETCH_LOCATIONS_SUCCESS:
      return state.mergeDeep(fromJS({
        data: action.payload.locations,
        error: null
      })
      )
    default:
      return state
  }
}

export default reducer
