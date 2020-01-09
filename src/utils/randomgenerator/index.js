import { 
  getPlayedUnplayedSequencesFormated,
  getPublishedUnpublishedContentFormated
} from './formatData'

import {
  filterSequences
} from './filterSequences'

import {
  calculateNextPosition
} from './positionCalculator'

import {
  calculateSequencesProbability,
  getRandomSequenceBasedonProbability
} from './probabilities'

export const getNextRandomSequence = (script, sequences) => {
  let {
    scriptSequences, 
    availableSequences
  } = getPlayedUnplayedSequencesFormated(script, sequences)

  const position = calculateNextPosition(scriptSequences, availableSequences, script)

  availableSequences = filterSequences(scriptSequences, availableSequences)
  availableSequences = calculateSequencesProbability(position, availableSequences)
  const selectedSequence = getRandomSequenceBasedonProbability(availableSequences)

  console.log(`%c index ${scriptSequences.length + 1}
  cat pos: ${position}
  selected sequence: ${selectedSequence.sceneNumber} 
  with probability:${selectedSequence.probability * 100}
  with closest position: ${selectedSequence.closestPosition} (distance: ${selectedSequence.positionDistance})`, 'color:#00bada')

  return {
    index: scriptSequences.length,
    position,
    sequence: selectedSequence,
    script: script.get('id')
  }
}

export const getNextRandomContent = (script, posts) => {
  let {
    scriptContent,
    availableContent
  } = getPublishedUnpublishedContentFormated(script, posts)
}


