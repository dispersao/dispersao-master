import createCachedSelector from 're-reselect'
import { createSelector } from 'reselect'
import { createArraySelector } from '../../utils/selectorUtils'
import { getCreditSequenceByPosition, getSequences } from '../sequences/selectors'

const getState = (state) => state.scriptsequences
const getId = (state, props) => props.id
const getCurrentScriptId = (state, props) => state.scripts.get('current')
export const getLoading = (state) => state.scriptsequences.get('loading')
export const getCurrentScriptPlaceholderScriptSequence =  (state) => state.scriptsequences.get('placeholderScriptsequence')

const getField = (state, props) => props.field

export const getScriptsequences = createSelector([getState], (state) => {
  if (!state) {
    return
  }
  return state.get('data')
})

export const formatScriptsequenceData = (scriptsequence, sequence) => {
  const elapsedTime = scriptsequence.get('elapsedTime') || 0
  const state = scriptsequence.get('state') || 'idle'
  return scriptsequence.mergeDeep({
    sequence,
    elapsedTime,
    state
  })
}

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

export const getCurrentScriptCreditsScriptsequenceByPosition = createSelector(
  [getCurrentScriptScriptsequences, getCreditSequenceByPosition],
  (scriptSequences, creditSequence) => {
    if (!scriptSequences || !creditSequence) {
      return
    }
    return scriptSequences.find(
      (scrseq) =>
        scrseq.get('sequence').toString() ===
        creditSequence.get('id').toString()
    )
  }
)

export const getCurrentScriptScriptsequencesIds = createArraySelector(
  [getCurrentScriptScriptsequences, getCurrentScriptPlaceholderScriptSequence],
  (scriptSequences, placeholder) => {
    if (!scriptSequences) {
      return
    } else {
      let orderedList = scriptSequences.sortBy((ss) => ss.get('index'))
      if(placeholder){
        orderedList =  orderedList.toList().splice(placeholder.get('index'), 0, placeholder)
      }
      return orderedList.map((el) => el.get('id'))
    }
  }
)
export const getCurrentScripScriptSequencesSentToPlayer = createArraySelector(
  [getCurrentScriptScriptsequences],
  (scriptsequences) => {
    if (!scriptsequences) {
      return
    } else {
      return scriptsequences
        .filter((el) => el.get('sentToPlayer'))
        .map((el) => el.get('id'))
        .valueSeq()
      }
    }
)
export const getHighestIndexSentToPlay = createSelector(
  [getCurrentScriptScriptsequences],
  (scriptsequences) => {
    if (!scriptsequences) {
      return
    } else {
      const sentIds = scriptsequences
        .filter((el) => el.get('sentToPlayer'))
        .sortBy((el) => el.get('index'))
      return sentIds.last()?.get('index')
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
  [getId, getScriptsequences, getSequences],
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

export const getScriptsequenceFieldByFieldName = createCachedSelector(
  [getScriptsequenceById, getField],
  (scriptsequence, field) => {
    if (!scriptsequence || !field) {
      return
    }
    return scriptsequence.get(field)
  }
)(getId)

