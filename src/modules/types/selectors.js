import createCachedSelector from 're-reselect'
import { createSelector } from 'reselect'

const getState = (state) => state.types
const getId = (state, props) => props.id
const getTypeId = (state, props) => props.type

export const getTypesList = createSelector(
  [getState], (state) => {
    if (!state) {
      return 
    }
    return state.get('data')
  }
)

export const getTypesListAsArray = createSelector(
  [getTypesList], (list) => {
    if(!list || !list.size) {
      return
    }
    return list.valueSeq()
  }
)

const fetchTypeById = (list, id) => {
  if (!list || !list.size || !id) {
    return
  }
  return list.get(id.toString())
}

export const getTypeById = createCachedSelector(
  [getTypesList, getId], fetchTypeById
)(getId)

export const getTypeByTypeId = createCachedSelector(
  [getTypesList, getTypeId], fetchTypeById
)(getTypeId)

