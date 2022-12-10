import createCachedSelector from 're-reselect'
import { createSelector } from 'reselect'

import { List } from 'immutable'

const getState = (state) => state.parts
const getPartId = (state, props) => props.id
const getPartsIds = (state, props) => props.parts


import { getCharactersList } from '../characters/selectors'

export const getPartsList = createSelector(
  [getState], (state) => {
    if (!state) {
      return 
    }
    return state.get('data')
  }
)

export const getPartsListFormated = createSelector(
  [getPartsList, getCharactersList],
  (parts, characters) => {
    if (!parts || !parts.size || !characters || !characters.size) {
      return
    }

    return parts
      .valueSeq()
      .map(part => {
        const chars = part.characters.map(charId => characters.get(charId.toString()))
        return part.setIn(['characters'], List(chars))
      })
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
