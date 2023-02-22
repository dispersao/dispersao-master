import { createSelector } from 'reselect'

const getState = (state) => state.contentcreators

export const getContentcreatorsList = createSelector(
  [getState], (state) => {
    if (!state) {
      return 
    }
    return state.get('data')
  }
)

