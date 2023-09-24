import {
  getPlayedUnplayedSequencesFormated,
  getPublishedUnpublishedContentFormated
} from './formatData'

import { filterSequences } from './filterSequences'

import { filterSessioncontent } from './filterSessioncontent'

import {
  calculateNextPosition,
  getOpeningCreditSequence,
  getClosingCreditSequence
} from './positionCalculator'

import {
  calculateSequencesProbability,
  getRandomSequenceBasedonProbability
} from './probabilities'

import { getRandomSessiontontents } from './probabilities/sessioncontent'

export const getNextRandomSequence = (script, sequences, creditsSequences) => {
  let { scriptSequences, availableSequences } =
    getPlayedUnplayedSequencesFormated(script, sequences)

  const openingCreditsSequence = getOpeningCreditSequence(
    scriptSequences,
    creditsSequences
  )

  const position = calculateNextPosition(
    scriptSequences,
    availableSequences,
    script
  )

  availableSequences = filterSequences(
    scriptSequences,
    availableSequences,
    creditsSequences
  )
  availableSequences = calculateSequencesProbability(
    position,
    availableSequences
  )
  const selectedSequence =
    getRandomSequenceBasedonProbability(availableSequences)

  const closingCreditsSequence = getClosingCreditSequence(
    script,
    selectedSequence,
    creditsSequences
  )

  console.log(
    `%c index ${scriptSequences.length + 1}
  cat pos: ${position}
  selected sequence: ${selectedSequence.sceneNumber} 
  with probability:${selectedSequence.probability * 100}
  with closest position: ${selectedSequence.closestPosition} (distance: ${
      selectedSequence.positionDistance
    })
  opening sequence: ${openingCreditsSequence}
  closing sequence: ${closingCreditsSequence}`,
    'color:#00bada'
  )

  const returnValue = []

  if (openingCreditsSequence) {
    returnValue.push({
      index: scriptSequences.length + 1,
      sequence: openingCreditsSequence,
      script: script.get('id')
    })
  }
  returnValue.push({
    index: scriptSequences.length + 1 + returnValue.length,
    position,
    sequence: selectedSequence.id,
    script: script.get('id')
  })

  if (closingCreditsSequence) {
    returnValue.push({
      index: scriptSequences.length + 1 + returnValue.length,
      sequence: closingCreditsSequence,
      script: script.get('id')
    })
  }
  return returnValue
}

export const getNextRandomContent = (scriptData, posts, comments) => {
  let { script, scriptContent, availableContent } =
    getPublishedUnpublishedContentFormated(scriptData, posts, comments)

  availableContent = filterSessioncontent(scriptContent, availableContent)

  let pendingContent = getRandomSessiontontents(
    script,
    scriptContent,
    availableContent
  )
  return pendingContent
}
