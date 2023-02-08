import createCachedSelector from 're-reselect'
import { createSelector } from 'reselect'

const getState = (state) => state.types

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
