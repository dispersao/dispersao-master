import { fromJS, mergeDeep } from 'immutable'

import {
  FETCH_SCRIPTSEQUENCES_SUCCESS,
  // FETCH_SCRIPTSEQUENCES_ERROR,
  CREATE_SCRIPTSEQUENCE_SUCCESS,
  // CREATE_SCRIPTSEQUENCE_ERROR,
  UPDATE_PROGRESS_SCRIPTSEQUENCE,
  UPDATE_SCRIPTSEQUENCE_LOCAL_STATE
} from './actions'

let id, progress

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
    
    case UPDATE_SCRIPTSEQUENCE_LOCAL_STATE:
      return state.mergeDeep(fromJS({
        data:{
          [action.payload.scriptsequence.id.toString()]: {
            ...action.payload.scriptsequence
          }
        }
      }))

    case CREATE_SCRIPTSEQUENCE_SUCCESS:
      return state.mergeDeep(fromJS({ 
        error: null, 
        data: action.payload.scriptsequence,
      }))

    case UPDATE_PROGRESS_SCRIPTSEQUENCE:
      id = action.payload.scriptsequence.id
      progress = action.payload.scriptsequence.progress
      return state.setIn(['data', id.toString(), 'progress'], progress)
      
    default:
      return state
  }
}

export default reducer
