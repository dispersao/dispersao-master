import createCachedSelector from 're-reselect'
import { Map } from 'immutable'
import { createSelector } from 'reselect'
import { getScriptByScriptId, getScriptId } from '../scripts/selectors'

import { getTypeByTypeId } from '../types/selectors'
import { getLocationByLocationId } from '../locations/selectors'

const getState = (state) => state.sequences
const getId = (state, props) => props.id
const getSequenceId = (state, props) => props.sequence

const getSequences = createSelector(
  [getState], (state) => {
    if (!state) {
      return
    }
    return state.get('data')
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

export const getSequenceListNotInScript = createCachedSelector(
  [getSequences, getScriptByScriptId, getScriptId],
  (sequences, script, scriptId) => {
    if (!sequences || !sequences.size || !script || !script.size || !scriptId) {
      return
    }
    return sequences.filter(seq => {
      return !script.get('scriptsequences').includes(seq.id)
    }).valueSeq().sort(sortSequences)
  }
)(getScriptId)

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
