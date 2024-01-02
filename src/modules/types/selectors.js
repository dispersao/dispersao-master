import { createSelector } from 'reselect'

const CREDITS = "CREDITO"

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
    return list.valueSeq().sortBy(type => type.get('name'))
  }
)

export const getCreditsType = createSelector(
  [getTypesList], 
  (list) => {
    if(!list || !list.size) {
      return
    }
    return list.find(type => type.get('credits'))
  }
)
