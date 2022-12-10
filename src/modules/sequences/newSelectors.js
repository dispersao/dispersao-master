import createCachedSelector from 're-reselect'
import { createSelector } from 'reselect'

import { sortEntity } from '../../utils/listUtils'
import { createArraySelector } from '../../utils/selectorUtils'
import { getCategoriesList } from '../categories/selectors'
import { getCurrentScriptFilters } from '../filters/selectors'
import { getLocationsList } from '../locations/selectors'
import { getPartsList } from '../parts/selectors'
import { getScriptsequences } from '../scriptsequences/selectors'
import { getTypesList } from '../types/selectors'

const getData = (state) => state.sequences.get('data')
const getId = (state, props) => props.id

const getCurrentScript = (state) => state.scripts.get('current')

export const getSequencesIds = createSelector([getData], (sequences) => {
  if (!sequences) {
    return
  }
  return sequences.sort(sortEntity).keySeq()
})

export const getSequenceById = createCachedSelector(
  [getData, getId],
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
      .filter((cat) => sequence.get('categories').includes(cat.get('id'))).valueSeq()
  }
)({
  selectorCreator: createArraySelector,
  keySelector: getId
})

export const getSequenceIsFiltered = createCachedSelector(
  [getSequenceById, getCurrentScriptFilters, getPartsList],
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
        if (option === 'and') {
          return filterValue.every((el) => list.includes(el))
        } else if (option === 'or') {
          return filterValue.some((el) => list.includes(el))
        } else if (option === 'exclude') {
          return filterValue.every((el) => !list.includes(el))
        }
      })
    }
  }
)(getId)

export const getSequenceIsInCurrentScript = createCachedSelector(
  [getCurrentScript, getScriptsequences, getId],
  (script, scriptsequences, id) => {
    if (!script || !scriptsequences || !id) {
      return
    }
    return scriptsequences.some(
      (sseq) => sseq.get('sequence') === id && sseq.get('script') === script
    )
  }
)(getId)
