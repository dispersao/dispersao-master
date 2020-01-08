import { fromJS } from 'immutable'

import {
  FETCH_CONTENTCREATORS_SUCCESS
} from './actions'

const reducer = (state = fromJS({
  data: {},
  error: null
}), action) => {
  switch (action.type) {
    case FETCH_CONTENTCREATORS_SUCCESS:
      return state.mergeDeep(fromJS({
        data: action.payload.contentcreators,
        error: null
      })
      )
    default:
      return state
  }
}

export default reducer
