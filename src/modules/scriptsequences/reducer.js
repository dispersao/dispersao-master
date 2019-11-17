import { fromJS } from 'immutable'

import {
  FETCH_SCRIPTSEQUENCES_SUCCESS,
  FETCH_SCRIPTSEQUENCES_ERROR,
  CREATE_SCRIPTSEQUENCES_SUCCESS,
  CREATE_SCRIPTSEQUENCES_ERROR
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
    default:
      return state
  }
}

export default reducer
