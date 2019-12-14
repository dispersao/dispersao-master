import createCachedSelector from 're-reselect'
import { Map, fromJS } from 'immutable'
import { createSelector } from 'reselect'

import { getTypeByTypeId, getTypesList } from '../types/selectors'
import { getLocationByLocationId, getLocationsList } from '../locations/selectors'
import { getCategoriesList } from '../categories/selectors'
import { getPartsList } from '../parts/selectors'
import { getCharactersList } from '../characters/selectors'

const getState = (state) => state.sequences
const getId = (state, props) => props.id
const getSequenceId = (state, props) => props.sequence
const getScriptsequences = (state, props) =>  props.scriptsequences

const getData = (state) => {
  if (!state) {
    return
  }
  return state.get('data')
}
export const getSequences = createSelector(
  [getState], 
  getData
)

export const getSequenceList = createSelector(
  [getSequences], (sequences) => {
    if (!sequences) {
      return 
    }
    return sequences.valueSeq().sort(sortSequences)
  }
)

export const getSequenceListFormatted = createSelector(
  [getSequenceList, getTypesList, getLocationsList, getPartsList, getCharactersList, getCategoriesList], 
  (sequences, types, locations, parts, characters, categories) => {

    const lists = [sequences, types, locations, parts, characters, categories]

    const anyEmpty = lists.some(list => !list || !list.size)

    if (anyEmpty) {
      return
    }
    return sequences
      .valueSeq()
      .sort(sortSequences)
      .map(seq => formatSequenceForAlgorithm(
        seq, 
        types, 
        locations, 
        parts,
        characters,
        categories
      ))
  }
)

export const getSequenceListNotInScript = createSelector(
  [getSequences, getScriptsequences],
  (sequences, scriptsequences) => {
    if (!sequences || !sequences.size || !scriptsequences) {
      return
    }
    const scriptSequencesIds = scriptsequences
      .map(el => el.sequence.id)
    return sequences
      .filter(seq => !scriptSequencesIds.includes(seq.get('id')))
      .valueSeq()
      .sort(sortSequences)
  }
)

const fetchSequenceFromId = (list, id, type, location) => {
  if (!list || !list.size || !id || !type || !location ) {
    return
  }
  let sequence = list.get(id.toString())
  return formatSequenceData(sequence, type, location)
}

export const getSequenceBySequenceId = createCachedSelector(
  [getSequences, getSequenceId, getTypeByTypeId, getLocationByLocationId], fetchSequenceFromId
)(getSequenceId)

export const getSequenceById = createCachedSelector(
  [getSequences, getId, getTypeByTypeId, getLocationByLocationId ], fetchSequenceFromId
)(getId)


const formatSequenceData = (seq, type, location) => {
  return Map({
    id: seq.get('id'),
    sceneNumber : seq.get('sceneNumber'),
    duration: seq.get('duration'),
    type: type.get('name'),
    location: location.get('name')
  })
}

const sortSequences = (a, b) => {
  return a.get('id') < b.get('id') ? -1 : (a.get('id') > b.get('id') ? 1 : 0)
}

const formatSequenceForAlgorithm = (seq, typesList, locationsList, partsList, charactersList, categoriesList) => {
  
  const type = typesList.get(seq.get('type'))
  const location = locationsList.get(seq.get('location'))

  const parts = seq.get('parts').map(partId => {
    return partsList.get(partId.toString())
  })

  let characters = parts
    .map(part => part.get('characters'))
    .flatten()
  
  characters = [...new Set(characters)]
    .map(charId => {
      return charactersList.get(charId.toString())
    })
    

  const categories = seq.get('categories').map(catId => {
    return categoriesList.get(catId.toString())
  })
  
  return seq.mergeDeep(fromJS({
    type,
    location,
    categories,
    parts,
    characters
  }))
}
