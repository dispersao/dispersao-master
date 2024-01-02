import { fromJS } from 'immutable'

import {
  FETCH_SEQUENCES_SUCCESS,
  FETCH_SEQUENCES_ERROR,
  SET_PLAYING_SEQUENCE
} from './actions'

const reducer = (state = fromJS({
  data: {},
  error: {},
  playing: null
}), action) => {
  switch (action.type) {
    case FETCH_SEQUENCES_SUCCESS:
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
    case SET_PLAYING_SEQUENCE:
      return state.setIn(['playing'], action.payload.sequence)
    default:
      return state
  }
}

export default reducer
