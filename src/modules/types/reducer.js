import { fromJS } from 'immutable'

import {
  FETCH_TYPE_SUCCESS
} from './actions'

const reducer = (state = fromJS({
  data: {},
  error: null
}), action) => {
  switch (action.type) {
    case FETCH_TYPE_SUCCESS:
      return state.mergeDeep(fromJS({
        data: action.payload.types,
        error: null
      })
      )
    default:
      return state
  }
}

export default reducer
