import { createSelector } from 'reselect'

const getState = (state) => state.parts

export const getPartsList = createSelector(
  [getState], (state) => {
    if (!state) {
      return 
    }
    return state.get('data')
  }
)


