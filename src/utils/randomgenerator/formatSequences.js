export const getPlayedUnplayedSequencesFormated = (scriptMap, sequencesList) => {
  const script = scriptMap.toJS()
  const sequences = sequencesList.toJS()

  const scriptSequencesIds = script.scriptsequences.map(scseq => scseq.sequence.id)

  const scriptSequences = sequences.filter(seq => scriptSequencesIds.includes(seq.id))
  const availableSequences = sequences.filter(seq => !scriptSequencesIds.includes(seq.id))

  return {
    scriptSequences,
    availableSequences
  }
}
