import createCachedSelector from 're-reselect'
import { createSelector } from 'reselect'
import { createArraySelector } from '../../utils/selectorUtils'

const getState = (state) => state.locations
const getId = (state, props) => props.id
const getLocationId = (state, props) => props.location
const getCreditsLocationPosition = (state, props) => props.creditsPosition

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
    return list.valueSeq().sortBy(location => location.get('name'))
  }
)

const fetchLocationById = (list, id) => {
  if (!list || !list.size || !id) {
    return
  }
  return list.get(id.toString())
}

export const getLocationByLocationId = createCachedSelector(
  [getLocationsList, getLocationId], fetchLocationById
)(getLocationId)

export const getCreditsLocations = createArraySelector(
  [getLocationsList], 
  (list) => {
    if(!list || !list.size) {
      return
    }
    return list.filter(location => location.get('creditsPosition')).valueSeq()
  }
)

export const getCreditsLocationByPosition = createArraySelector(
  [getCreditsLocationPosition, getLocationsList], 
  (position, list) => {
    if(!list || !list.size || !position ) {
      return
    }
    return list.find(location => location.get('creditsPosition') === position)
  }
)
