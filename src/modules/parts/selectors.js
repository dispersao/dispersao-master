import createCachedSelector from 're-reselect'
import { createSelector } from 'reselect'

const getState = (state) => state.parts
const getPartId = (state, props) => props.id

export const getPartsList = createSelector(
  [getState], (state) => {
    if (!state) {
      return 
    }
    return state.get('data')
  }
)

export const getPartById = createCachedSelector(
  [getPartsList, getPartId], 
  (list, id) => {
    if (!list || !list.size || !id) {
      return
    }
    return list.get(id.toString())
 
  }
)(getPartId)
