import { 
  getPlayedUnplayedSequencesFormated,
  getPublishedUnpublishedContentFormated
} from './formatData'

import {
  filterSequences
} from './filterSequences'

import {
  filterSessioncontent
} from './filterSessioncontent'

import {
  calculateNextPosition
} from './positionCalculator'

import {
  calculateSequencesProbability,
  getRandomSequenceBasedonProbability
} from './probabilities'

import {
  getRandomSessiontontents
} from './probabilities/sessioncontent'

export const getNextRandomSequence = (script, sequences, creditsSequences) => {
  let {
    scriptSequences, 
    availableSequences
  } = getPlayedUnplayedSequencesFormated(script, sequences)

  const position = calculateNextPosition(scriptSequences, availableSequences, script)

  availableSequences = filterSequences(scriptSequences, availableSequences, creditsSequences)
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
    sequence: selectedSequence.id,
    script: script.get('id')
  }
}

export const getNextRandomContent = (scriptData, posts, comments) => {
  let {
    script,
    scriptContent,
    availableContent
  } = getPublishedUnpublishedContentFormated(scriptData, posts, comments)
  
  availableContent = filterSessioncontent(scriptContent, availableContent)

  let pendingContent = getRandomSessiontontents(script, scriptContent, availableContent)
  return pendingContent
}
