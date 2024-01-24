import createCachedSelector from 're-reselect'
import { createSelector } from 'reselect'

const getState = (state) => state.characters
const getCharactersId = (state, props) => props.id

export const getCharactersList = createSelector([getState], (state) => {
  if (!state) {
    return
  }
  return state.get('data')
})

export const getCharactersListAsArray = createSelector(
  [getCharactersList],
  (list) => {
    if (!list || !list.size) {
      return
    }
    return list.valueSeq().sortBy(char => char.get('name'))
  }
)

