import { fromJS } from 'immutable'

import {
  FETCH_SCRIPTSEQUENCES_SUCCESS,
  FETCH_SCRIPTSEQUENCES_ERROR,
  CREATE_SCRIPTSEQUENCE_SUCCESS,
  CREATE_SCRIPTSEQUENCE_ERROR
} from './actions'

const reducer = (state = fromJS({
  data: {},
  error: null
}), action) => {
  switch (action.type) {
    case FETCH_SCRIPTSEQUENCES_SUCCESS:
      return state.mergeDeep(fromJS({ 
        error: null, 
        data: action.payload.scriptsequences,
      }))
    case CREATE_SCRIPTSEQUENCE_SUCCESS:
      return state.mergeDeep(fromJS({ 
        error: null, 
        data: action.payload.scriptsequence,
      }))
    default:
      return state
  }
}

export default reducer
