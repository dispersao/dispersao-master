import { fromJS } from 'immutable'
import { FETCH_LIKES_SUCCESS } from './actions'

const reducer = (
  state = fromJS({ data: {}, error: null }),
  { type, payload }
) => {
  switch (type) {
    case FETCH_LIKES_SUCCESS:
      return state.mergeDeep(fromJS({
        data: payload.likes
      }))

    default:
      return state
  }
}

export default reducer
