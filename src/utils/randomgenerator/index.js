import { 
  getPlayedUnplayedSequencesFormated
} from './formatData'

import {
  filterSequences
} from './filterSequences'

import {
  calculateSequencesProbability,
  getRandomSequenceBasedonProbability
} from './probabilities'

export const getNextRandomSequence = (script, sequences) => {

  let {
    scriptSequences, 
    availableSequences
  } = getPlayedUnplayedSequencesFormated(script, sequences)

  availableSequences = filterSequences(scriptSequences, availableSequences)
  availableSequences = calculateSequencesProbability(scriptSequences.length + 1, availableSequences)
  const selectedSequence = getRandomSequenceBasedonProbability(availableSequences)

  console.log(`%c pos ${scriptSequences.length + 1}: 
  selected sequence: ${selectedSequence.sceneNumber} 
  with probability:${selectedSequence.probability * 100}
  with closest position: ${selectedSequence.closestPosition} (distance: ${selectedSequence.positionDistance})`, 'color:#00bada')

  return {
    index: scriptSequences.length,
    sequence: selectedSequence,
    script: script.get('id')
  }
}


