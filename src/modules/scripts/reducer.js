import { fromJS } from 'immutable'

import {
  FETCH_SCRIPTS_SUCCESS,
  FETCH_SCRIPTS_ERROR,
  CREATE_SCRIPT_SUCCESS,
  CREATE_SCRIPT_ERROR,
} from './actions'

let list

const reducer = (state = fromJS({
  data: {},
  error: null
}), action) => {
  switch (action.type) {
    case FETCH_SCRIPTS_SUCCESS:
      return state.mergeDeep(fromJS({ error: null, data: action.payload.scripts }))
    case FETCH_SCRIPTS_ERROR:
      return state.mergeDeep(fromJS({ error: action.payload.error }))
    case CREATE_SCRIPT_SUCCESS:
      console.log(state.mergeDeep(fromJS({ error: null, data: action.payload.script })))
      return state.mergeDeep(fromJS({ error: null, data: action.payload.script }))
    case CREATE_SCRIPT_ERROR:
      return state.mergeDeep(fromJS({ error: action.payload.error }))
    default:
      return state
  }
}

export default reducer
