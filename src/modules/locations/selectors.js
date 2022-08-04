import createCachedSelector from 're-reselect'
import { createSelector } from 'reselect'

const getState = (state) => state.locations
const getId = (state, props) => props.id
const getLocationId = (state, props) => props.location

export const getLocationsList = createSelector(
  [getState], (state) => {
    if (!state) {
      return 
    }
    return state.get('data')
  }
)

export const getLocationListAsArray = createSelector(
  [getLocationsList], (list) => {
    if(!list || !list.size) {
      return
    }
    return list.valueSeq()
  }
)

const fetchLocationById = (list, id) => {
  if (!list || !list.size || !id) {
    return
  }
  return list.get(id.toString())
}

export const getLocationById = createCachedSelector(
  [getLocationsList, getId], fetchLocationById
)(getId)

export const getLocationByLocationId = createCachedSelector(
  [getLocationsList, getLocationId], fetchLocationById
)(getLocationId)
