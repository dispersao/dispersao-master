import createCachedSelector from 're-reselect'
import { createSelector } from 'reselect'

import { getSequenceBySequenceId } from '../sequences/selectors'

const getState = (state) => state.scriptsequences
const getId = (state, props) => props.id


export const getScriptsequences = createSelector(
  [getState], (state) => {
    if (!state) {
      return
    }
    return state.get('data')
  }
)

const fetchScriptsequenceFromId = (list, id) => {
  if (!list || !list.size || !id ) {
    return
  }
  return list.get(id.toString())
}

const fetchScriptsequenceFromIdFormat = (list, id, sequence) => {
  if (!list || !list.size || !id || !sequence || !sequence.size) {
    return
  }
  let scriptsequence = fetchScriptsequenceFromId(list, id)
  return formatScriptsequenceData(scriptsequence, sequence)
}

export const getScriptsequenceById = createCachedSelector(
  [getScriptsequences, getId, getSequenceBySequenceId],
  fetchScriptsequenceFromIdFormat
)(getId)

export const getScriptsequenceByIdNoFormat = createCachedSelector(
  [getScriptsequences, getId],
  fetchScriptsequenceFromId
)(getId)

export const formatScriptsequenceData = (scriptsequence, sequence) => {
  const elapsedTime = scriptsequence.get('elapsedTime') || 0
  const state = scriptsequence.get('state') || 'idle'
  return scriptsequence.mergeDeep({ 
    sequence,
    elapsedTime,
    state
  })
}
