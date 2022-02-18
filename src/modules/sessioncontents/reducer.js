import { fromJS } from 'immutable'

import {
  FETCH_SESSIONCONTENTS_SUCCESS,
  CREATE_SESSIONCONTENT_SUCCESS,
  UPDATE_SESSIONCONTENT_SUCCESS,
  UPDATE_SESSIONCONTENT_STATE_SUCCESS
} from './actions'

import {
  UPDATE_SCRIPT_SUCCESS
} from '../scripts/actions'

let filteredList, script


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

    case UPDATE_SCRIPT_SUCCESS:
      script = Object.values(action.payload.script)[0]
      filteredList = state.get('data').filter(el => el.get('script') === script.id && !script.sessioncontents.includes(el.get('id')))
      filteredList.forEach(deleted => {
        state = state.deleteIn(['data', deleted.get('id').toString()])
      })
      return state

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
