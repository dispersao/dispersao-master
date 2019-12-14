import { 
  getPlayedUnplayedSequencesFormated
} from './formatSequences'

export const getNextRandomSequence = (script, sequences) => {

  const {
    scriptSequence, 
    availableSequences
  } = getPlayedUnplayedSequencesFormated(script, sequences)

 

  console.log(scriptSequence)
  // console.log(sequences.toJS())
  const seed = Math.floor(Math.random() * sequences.size)
  return {
    index: script.get('scriptsequences').size,
    sequence: sequences.valueSeq().get(seed).get('id'),
    script: script.get('id')
  }
}


