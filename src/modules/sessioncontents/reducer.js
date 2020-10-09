import { fromJS } from 'immutable'

import {
  FETCH_SESSIONCONTENTS_SUCCESS,
  CREATE_SESSIONCONTENT_SUCCESS,
  UPDATE_SESSIONCONTENT_SUCCESS,
  UPDATE_SESSIONCONTENT_STATE_SUCCESS
} from './actions'

const reducer = (state = fromJS({
  data: {},
  error: null
}), action) => {
  switch (action.type) {

    case FETCH_SESSIONCONTENTS_SUCCESS:
      return state.mergeDeep(fromJS({ 
        error: null, 
        data: action.payload.sessioncontents,
      }))

    case CREATE_SESSIONCONTENT_SUCCESS:
      return state.mergeDeep(fromJS({ 
        error: null, 
        data: action.payload.sessioncontents,
      }))

    case UPDATE_SESSIONCONTENT_SUCCESS:
    case UPDATE_SESSIONCONTENT_STATE_SUCCESS:
      return state.mergeDeep(fromJS({ 
        error: null, 
        data: action.payload.sessioncontents,
      }))
    default:
      return state
  }
}

export default reducer
