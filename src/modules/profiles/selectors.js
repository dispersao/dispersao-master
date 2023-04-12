import createCachedSelector from 're-reselect'
import { createSelector } from 'reselect'
import { getContentcreatorsList } from '../contentcreators/selectors'

const getState = (state) => state.profiles
const getId = (state, props) => props.id

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

export const getProfileContentcreatorByProfileId = createCachedSelector(
[getId, getProfiles, getContentcreatorsList],
(id, profiles,contentcreators) => {
  if(!id || !profiles || !contentcreators){
    return
  }

  const profile = profiles.get(id.toString())

  return contentcreators.get(
   profile.get('contentcreator').toString()
  )
}

)(getId)
