import { fromJS, Map } from 'immutable'

import {
  FETCH_CONFIG_SUCCESS,
  FETCH_CONFIG_ERROR
} from './actions'

const reducer = (state = fromJS({
  data: {}, 
  error:{} 
}), action) => {
  switch (action.type) {
    case FETCH_CONFIG_SUCCESS:
      return state.mergeDeep(
        fromJS({
          data:action.payload
        })
      )

    case FETCH_CONFIG_ERROR:
      return state.mergeDeep(
        fromJS({
          error: action.payload
        })
      )

    default:
      return state
  }
}

export default reducer
