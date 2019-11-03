import createCachedSelector from 're-reselect'
import { createSelector } from 'reselect'

const getState = (state) => state.sequences
const getSequenceId = (state, props) => props.id

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
    return sequences.valueSeq().map(sequence => formatSequenceData(sequence))
  }
)

export const getScriptById = createCachedSelector(
  [getSequences, getSequenceId], 
  (list, id) => {
    if (!list || !list.size || !id) {
      return
    }
    let sequence = list.get(id.toString())
    return formatSequenceData(sequence)
  }
)(getSequenceId)

const formatSequenceData = (seq) => {
  return seq
}
