import { fromJS } from 'immutable'

import {
  FETCH_PROFILES_SUCCESS
} from './actions'

const reducer = (state = fromJS({
  data: {},
  error: null
}), action) => {
  switch (action.type) {
    case FETCH_PROFILES_SUCCESS:
      return state.mergeDeep(fromJS({
        data: action.payload.profiles,
        error: null
      })
      )
    default:
      return state
  }
}

export default reducer
