import createCachedSelector from 're-reselect'
import { createSelector } from 'reselect'

import { List, fromJS } from 'immutable'

import { sortEntity } from '../../utils/listUtils'
import { createArraySelector } from '../../utils/selectorUtils'
import { getCategoriesList } from '../categories/selectors'
import { getCurrentScriptIdFilters } from '../filters/selectors'
import {
  getLocationsList,
  getCreditsLocationByPosition
} from '../locations/selectors'
import { getPartsList } from '../parts/selectors'
import { getCreditsType, getTypesList } from '../types/selectors'
import { getCharactersList } from '../characters/selectors'

const getId = (state, props) => props.id
const getState = (state) => state.sequences
const getScriptsequences = (state) => state.scriptsequences.get('data')
const getCurrentScriptId = (state) => state.scripts.get('current')

export const getSequences = createSelector([getState], (state) => {
  if (!state) {
    return
  }
  return state.get('data')
})
export const getSequenceList = createSelector([getSequences], (sequences) => {
  if (!sequences) {
    return
  }
  return sequences.valueSeq().sort(sortEntity)
})

export const getSequencesIds = createSelector([getSequences], (sequences) => {
  if (!sequences) {
    return
  }
  return sequences.sort(sortEntity).keySeq()
})

export const getSequenceById = createCachedSelector(
  [getSequences, getId],
  (sequences, id) => {
    if (!sequences || !id) {
      return
    } else {
      return sequences.get(id.toString())
    }
  }
)(getId)

export const getSequenceTypeById = createCachedSelector(
  [getSequenceById, getTypesList],
  (sequence, types) => {
    if (!sequence || !types) {
      return
    }
    return types.get(sequence.get('type').toString())
  }
)(getId)

export const getSequenceLocationById = createCachedSelector(
  [getSequenceById, getLocationsList],
  (sequence, locations) => {
    if (!sequence || !locations) {
      return
    }
    return locations.get(sequence.get('location').toString())
  }
)(getId)

export const getSequenceCategoriesById = createCachedSelector(
  [getSequenceById, getCategoriesList],
  (sequence, categories) => {
    if (!sequence || !categories) {
      return
    }
    return categories
      .filter((cat) => sequence.get('categories').includes(cat.get('id')))
      .valueSeq()
  }
)({
  selectorCreator: createArraySelector,
  keySelector: getId
})

export const getSequenceIsFiltered = createCachedSelector(
  [getSequenceById, getCurrentScriptIdFilters, getPartsList],
  (sequence, filters, parts) => {
    if (!sequence || !parts) {
      return
    } else if (!filters || !filters.size) {
      return true
    } else {
      return filters.every((filter) => {
        const dataType = filter.get('data')
        const filterValue = filter.get('value')
        const option = filter.get('option')
        let list

        if (!filterValue.size) {
          return true
        }

        if (dataType === 'characters') {
          list = sequence
            .get('parts')
            .map((partId) => parts.get(partId.toString()))
            .map((part) => part.get('characters'))
            .flatten()
            .toSet()
        } else {
          list = sequence.get(dataType)
          if (!List.isList(list)) {
            list = [list]
          }
        }
        let ret
        if (option === 'and') {
          ret = filterValue.every((el) => list.includes(el))
        } else if (option === 'or') {
          ret = filterValue.some((el) => list.includes(el))
        } else if (option === 'exclude') {
          ret = filterValue.every((el) => !list.includes(el))
        }
        return ret
      })
    }
  }
)(getId)

export const getSequenceIsInCurrentScript = createCachedSelector(
  [getCurrentScriptId, getScriptsequences, getId],
  (script, scriptsequences, id) => {
    if (!script || !scriptsequences || !id) {
      return
    }
    return scriptsequences.some(
      (sseq) =>
        sseq.get('sequence').toString() === id.toString() &&
        sseq.get('script').toString() === script.toString()
    )
  }
)(getId)

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
export const getCreditsSequences = createArraySelector(
  [getSequenceList, getCreditsType],
  (sequences, type) => {
    if (!sequences || !sequences.size || !type || !types.size) {
      return
    }
    return sequences
      .filter((seq) => seq.get('type') === type.get('id'))
      .valueSeq()
  }
)

export const getCreditSequenceByPosition = createSelector(
  [getSequenceList, getCreditsType, getCreditsLocationByPosition],
  (sequences, type, location) => {
    if (
      !sequences ||
      !sequences.size ||
      !type ||
      !type.size ||
      !location ||
      !location.size
    ) {
      return
    }
    return sequences.find(
      (seq) =>
        seq.get('type').toString() === type.get('id').toString() &&
        seq.get('location').toString() === location.get('id').toString()
    )
  }
)

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
