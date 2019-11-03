import createCachedSelector from 're-reselect'
import { createSelector } from 'reselect'

const getState = (state) => state.types
const getTypeId = (state, props) => props.id

export const getTypesList = createSelector(
  [getState], (state) => {
    if (!state) {
      return 
    }
    return state.get('data')
  }
)

export const getTypeById = createCachedSelector(
  [getTypesList, getTypeId], 
  (list, id) => {
    if (!list || !list.size || !id) {
      return
    }
    return list.get(id.toString())
 
  }
)(getTypeId)
