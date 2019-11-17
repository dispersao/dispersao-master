import createCachedSelector from 're-reselect'
import { Map } from 'immutable'
import { createSelector } from 'reselect'

import { getTypeByTypeId } from '../types/selectors'
import { getLocationByLocationId } from '../locations/selectors'

const getState = (state) => state.sequences
const getScriptSequencesState = (state) => state.scriptsequences
const getId = (state, props) => props.id
const getSequenceId = (state, props) => props.sequence

const getScriptsequencesIds = (state, props) => props.scriptsequences

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

const getScriptsequences = createSelector(
  [getScriptSequencesState], 
  getData
)

export const getScriptSequencesByIds = createSelector(
  [getScriptsequences, getScriptsequencesIds],
  (scriptSequences, ids) => {
    if (!scriptSequences || !ids) {
      return
    }
    return ids.map(id => scriptSequences.get(id.toString()))
  }
)

export const getSequenceList = createSelector(
  [getSequences], (sequences) => {
    if (!sequences) {
      return 
    }
    return sequences.valueSeq().sort(sortSequences)
  }
)

export const getSequenceListNotInScript = createSelector(
  [getSequences, getScriptSequencesByIds],
  (sequences, scriptsequences) => {
    if (!sequences || !sequences.size || !scriptsequences) {
      return
    }
    return sequences.filter(seq => {
      return !scriptsequences
        .map(el => el.get('sequence'))
        .includes(seq.id)
    }).valueSeq().sort(sortSequences)
  }
)

const fetchSequenceFromId = (list, id, type, location) => {
  if (!list || !list.size || !id || !type || !location) {
    return
  }
  let sequence = list.get(id.toString())
  return formatSequenceData(sequence, type, location)
}

export const getSequenceBySequenceId = createCachedSelector(
  [getSequences, getSequenceId, getTypeByTypeId, getLocationByLocationId], fetchSequenceFromId
)(getSequenceId)

export const getSequenceById = createCachedSelector(
  [getSequences, getId, getTypeByTypeId, getLocationByLocationId], fetchSequenceFromId
)(getId)

const formatSequenceData = (seq, type, location) => {
  // console.log(seq, type, location)
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
