import createCachedSelector from 're-reselect'
import { fromJS, List } from 'immutable'
import { createSelector } from 'reselect'

import { sortEntity } from '../../utils/listUtils'

import { getTypeByTypeId, getTypesList } from '../types/selectors'
import {
  getLocationByLocationId,
  getLocationsList
} from '../locations/selectors'
import { getCategoriesList } from '../categories/selectors'
import { getPartsList } from '../parts/selectors'
import { getCharactersList } from '../characters/selectors'

const getState = (state) => state.sequences
const getId = (state, props) => props.id
const getSequenceId = (state, props) => props.sequence

const getData = (state) => {
  if (!state) {
    return
  }
  return state.get('data')
}
export const getSequences = createSelector([getState], getData)

export const getSequenceList = createSelector([getSequences], (sequences) => {
  if (!sequences) {
    return
  }
  return sequences.valueSeq().sort(sortEntity)
})

export const getSequenceListFormatted = createSelector(
  [
    getSequenceList,
    getTypesList,
    getLocationsList,
    getPartsList,
    getCharactersList,
    getCategoriesList
  ],
  (sequences, types, locations, parts, characters, categories) => {
    const lists = [sequences, types, locations, parts, characters, categories]

    const anyEmpty = lists.some((list) => !list || !list.size)

    if (anyEmpty) {
      return
    }
    return sequences
      .valueSeq()
      .sort(sortEntity)
      .map((seq) =>
        formatSequenceForAlgorithm(
          seq,
          types,
          locations,
          parts,
          characters,
          categories
        )
      )
  }
)


const fetchSequenceFromId = (
  list,
  id,
  type,
  location,
  parts,
  characters,
  categories
) => {
  if (!list || !list.size || !id || !type || !location) {
    return
  }
  let sequence = list.get(id.toString())
  return formatSequenceForAlgorithm(
    sequence,
    type,
    location,
    parts,
    characters,
    categories
  )
}

export const getSequenceBySequenceId = createCachedSelector(
  [
    getSequences,
    getSequenceId,
    getTypeByTypeId,
    getLocationByLocationId,
    getPartsList,
    getCharactersList,
    getCategoriesList
  ],
  fetchSequenceFromId
)(getSequenceId)

export const getSequenceById = createCachedSelector(
  [
    getSequences,
    getId,
    getTypesList,
    getLocationsList,
    getPartsList,
    getCharactersList,
    getCategoriesList
  ],
  fetchSequenceFromId
)(getId)

const formatSequenceForAlgorithm = (
  seq,
  typesList,
  locationsList,
  partsList,
  charactersList,
  categoriesList
) => {
  const type = typesList.get(seq.get('type').toString())
  const location = locationsList.get(seq.get('location').toString())

  const parts = seq.get('parts').map((partId) => {
    return partsList.get(partId.toString())
  })

  let characters = parts.map((part) => part.get('characters')).flatten()

  characters = [...new Set(characters)].map((charId) => {
    return charactersList.get(charId.toString())
  })

  const categories = seq.get('categories').map((catId) => {
    return categoriesList.get(catId.toString())
  })

  let mergedSeq = seq.mergeDeep(
    fromJS({
      type,
      location,
      characters
    })
  )

  mergedSeq = mergedSeq.setIn(['categories'], List(categories))
  mergedSeq = mergedSeq.setIn(['parts'], List(parts))

  return mergedSeq
}
