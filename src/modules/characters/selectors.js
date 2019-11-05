import createCachedSelector from 're-reselect'
import { createSelector } from 'reselect'

const getState = (state) => state.characterss
const getCharactersId = (state, props) => props.id

export const getCharacterssList = createSelector(
  [getState], (state) => {
    if (!state) {
      return 
    }
    return state.get('data')
  }
)

export const getCharactersById = createCachedSelector(
  [getCharacterssList, getCharactersId], 
  (list, id) => {
    if (!list || !list.size || !id) {
      return
    }
    return list.get(id.toString())
 
  }
)(getCharactersId)
