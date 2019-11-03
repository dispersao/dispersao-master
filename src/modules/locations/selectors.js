import createCachedSelector from 're-reselect'
import { createSelector } from 'reselect'

const getState = (state) => state.locations
const getLocationId = (state, props) => props.id

export const getLocationsList = createSelector(
  [getState], (state) => {
    if (!state) {
      return 
    }
    return state.get('data')
  }
)

export const getLocationById = createCachedSelector(
  [getLocationsList, getLocationId], 
  (list, id) => {
    if (!list || !list.size || !id) {
      return
    }
    return list.get(id.toString())
 
  }
)(getLocationId)
