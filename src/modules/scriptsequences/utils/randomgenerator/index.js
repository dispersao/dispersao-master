export const getNextRandomSequence = (script, sequences) => {
  const seed = Math.floor(Math.random() * sequences.size)
  return {
    index: script.get('scriptsequences').size,
    sequence: sequences.valueSeq().get(seed).get('id'),
    script: script.get('id')
  }
}
