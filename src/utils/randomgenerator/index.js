import {
  getPlayedUnplayedSequencesFormated,
  getPublishedUnpublishedContentFormated
} from './formatData'

import { filterSequences } from './filterSequences'

import { filterSessioncontent } from './filterSessioncontent'

import {
  calculateNextPosition,
  getOpeningCreditSequence,
  getClosingCreditSequence,
  shouldCreateRegularSequence
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

  let selectedNextSequence, position

  if (shouldCreateRegularSequence(script, scriptSequences, creditsSequences)) {
    position = calculateNextPosition(
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
    selectedNextSequence =
      getRandomSequenceBasedonProbability(availableSequences)
  }

  const closingCreditsSequence = getClosingCreditSequence(
    script,
    scriptSequences,
    selectedNextSequence,
    creditsSequences
  )
  if (selectedNextSequence) {
    console.log(
      `%c index ${scriptSequences.length + 1}
  cat pos: ${position}
  selected sequence: ${selectedNextSequence.sceneNumber} 
  with probability:${selectedNextSequence.probability * 100}
  with closest position: ${selectedNextSequence.closestPosition} (distance: ${
        selectedNextSequence.positionDistance
      })
  opening sequence: ${openingCreditsSequence}
  closing sequence: ${closingCreditsSequence}`,
      'color:#00bada'
    )
  }

  const returnValue = []

  if (openingCreditsSequence) {
    returnValue.push({
      index: scriptSequences.length,
      sequence: openingCreditsSequence,
      script: script.get('id')
    })
  }
  if(selectedNextSequence){
    returnValue.push({
      index: scriptSequences.length + returnValue.length,
      position,
      sequence: selectedNextSequence.id,
      script: script.get('id')
    })
  }

  if (closingCreditsSequence) {
    returnValue.push({
      index: scriptSequences.length + returnValue.length,
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
