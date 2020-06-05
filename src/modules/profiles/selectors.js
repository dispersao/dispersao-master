import { createSelector } from 'reselect'

const getState = (state) => state.profiles

export const getProfiles = createSelector(
  [getState], (state) => {
    if (!state) {
      return 
    }
    return state.get('data')
  }
)

export const getProfileList = createSelector(
  [getProfiles], (profiles) => {
    if (!profiles) {
      return
    }
    return profiles.valueSeq()
  }
)
