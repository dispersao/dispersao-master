import { fromJS } from 'immutable'

import {
  FETCH_SEQUENCES_SUCCESS,
  FETCH_SEQUENCES_ERROR
} from './actions'

const reducer = (state = fromJS({
  data: {},
  error: {}
}), action) => {
  switch (action.type) {
    case FETCH_SEQUENCES_SUCCESS:
      console.log(state.mergeDeep(
        fromJS({
          error: null,
          data: action.payload.sequences
        })
      ))
      return state.mergeDeep(
        fromJS({
          error: null,
          data: action.payload.sequences
        })
      )
    case FETCH_SEQUENCES_ERROR:
      return state.mergeDeep(
        fromJS({
          error: action.payload.error
        })
      )
    default:
      return state
  }
}

export default reducer
