import { List } from 'immutable'
import createCachedSelector from 're-reselect'
import { shallowEqual } from 'react-redux'
import { createSelector } from 'reselect'
import { createArraySelector } from '../../utils/selectorUtils'

import {
  getSequenceBySequenceId,
  getSequenceList
} from '../sequences/selectors'

const getState = (state) => state.scriptsequences
const getId = (state, props) => props.id
const getCurrentScriptId = (state, props) => state.scripts.get('current')
export const getLoading = (state) => state.scriptsequences.get('loading')

export const getScriptsequences = createSelector([getState], (state) => {
  if (!state) {
    return
  }
  return state.get('data')
})

const fetchScriptsequenceFromId = (list, id) => {
  if (!list || !list.size || !id) {
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
///-----------new methods

export const getScriptsequenceById = createCachedSelector(
  [getId, getScriptsequences],
  (scriptsequence, scriptsequences) => {
    if (!scriptsequence || !scriptsequences) {
      return
    }
    return scriptsequences.get(scriptsequence.toString())
  }
)(getId)

export const getCurrentScriptScriptsequences = createArraySelector(
  [getCurrentScriptId, getScriptsequences],
  (script, scriptSequences) => {
    if (!script || !scriptSequences) {
      return
    } else {
      const mapped = scriptSequences
        .filter((ss) => ss.get('script').toString() === script)
        .sortBy((el) => el.get('index'))
        .valueSeq()

      return mapped
    }
  }
)

export const getCurrentScriptScriptsequencesIds = createArraySelector(
  [getCurrentScriptScriptsequences],
  (scriptSequences) => {
    if (!scriptSequences) {
      return
    } else {
      return scriptSequences.map(ss => ss.get('id'))
    }
  }
)

export const getScriptsequenceSequenceIdById = createCachedSelector(
  [getId, getScriptsequences],
  (scriptsequence, scriptsequences) => {
    if (!scriptsequence || !scriptsequences) {
      return
    }
    return scriptsequences.getIn([scriptsequence.toString(), 'sequence'])
  }
)(getId)

export const getScriptsequenceSequenceById = createCachedSelector(
  [getId, getScriptsequences, getSequenceList],
  (scriptsequence, scriptsequences, sequences) => {
    if (!scriptsequence || !scriptsequences || !sequences) {
      return
    }
    const sequenceId = scriptsequences.getIn([
      scriptsequence.toString(),
      'sequence'
    ])
    return sequences.get(sequenceId.toString())
  }
)(getId)
