import { fromJS } from 'immutable'

import {
  CREATE_SCRIPT_SUCCESS,
  CREATE_SCRIPT_ERROR
} from './actions'

const reducer = (state = fromJS({
  data: [],
  error: {}
}), action) => {
  switch (action.type) {
    case CREATE_SCRIPT_SUCCESS:
      return state.mergeDeep(fromJS({ data: action.payload.script }))
    case CREATE_SCRIPT_ERROR:
      return state.mergeDeep(fromJS({ error: action.payload.error }))
    default:
      return state
  }
}

export default reducer
