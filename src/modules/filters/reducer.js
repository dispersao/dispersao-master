import { fromJS } from 'immutable'

import { UPDATE_FILTER, CLEAR_FILTERS } from './actions'

const reducer = (state = fromJS([]), action) => {
  switch (action.type) {
    case UPDATE_FILTER:
      return updateFilter(state, action.payload)
    case CLEAR_FILTERS:
      return fromJS([])
    default:
      return state
  }
}

const updateFilter = (state, payload) => {
  const { script, type, data } = payload
  const filterIndex = state.findIndex((el) => {
    return (
      el.get('script') === script &&
      el.get('data') === data &&
      (!type || el.get('type') === type)
    )
  })
  if (filterIndex === -1) {
    const newState = state.push(fromJS(payload))
    return newState
  } else {
    return state.set(filterIndex, fromJS(payload))
  }
}

export default reducer
