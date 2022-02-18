import { fromJS } from 'immutable'

import {
  FETCH_SCRIPTSEQUENCES_SUCCESS,
  CREATE_SCRIPTSEQUENCE_SUCCESS,
  UPDATE_PROGRESS_SCRIPTSEQUENCE,
  UPDATE_SCRIPTSEQUENCE_LOCAL_STATE,
} from './actions'

import {
  UPDATE_SCRIPT_SUCCESS
} from '../scripts/actions'

let id, progress, filteredList, script

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

    case UPDATE_SCRIPT_SUCCESS:
      script = Object.values(action.payload.script)[0]
      filteredList = state.get('data').filter(el => el.get('script') === script.id && !script.scriptsequences.includes(el.get('id')))
      filteredList.forEach(deleted => {
        state = state.deleteIn(['data', deleted.get('id').toString()])
      })
      return state

    case UPDATE_PROGRESS_SCRIPTSEQUENCE:
      id = action.payload.scriptsequence.id
      progress = action.payload.scriptsequence.progress
      return state.setIn(['data', id.toString(), 'progress'], progress)
      
    default:
      return state
  }
}

export default reducer
