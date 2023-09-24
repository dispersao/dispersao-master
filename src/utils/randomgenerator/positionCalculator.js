import { getEntityCategoriesByType, mapCategoryToText } from './formatData'

import uniq from 'lodash/uniq'

export const calculateNextPosition = (
  scriptequences,
  availablesequences,
  script
) => {
  const highestPosition = Math.max(
    ...uniq(
      scriptequences
        .concat(availablesequences)
        .map((seq) => getEntityCategoriesByType(seq, 'pos'))
        .filter(Boolean)
        .map(mapCategoryToText)
        .flatten()
    ).map(Number)
  )

  const secondsPerPosition =
    Number(script.get('averageSeconds')) / highestPosition

  const nextPosition =
    Math.round(Number(script.get('totalTime')) / secondsPerPosition) + 1

  console.log(
    `%c nextPosition: ${nextPosition}, currentTime: ${script.get(
      'totalTime'
    )}, secondsPerPosition: ${secondsPerPosition}`,
    'color:#cec137'
  )
  return nextPosition
}

export const getOpeningCreditSequence = (scriptSequences, { opening }) => {
  if (!scriptSequences.length && opening) {
    return opening.get('id')
  }
}

export const getClosingCreditSequence = (script, nextSequence, { closing }) => {
  const timeSum =
    script.get('totalTime') + nextSequence.duration + closing.get('duration')
  if (closing && timeSum >= script.get('averageSeconds')) {
    return closing.get('id')
  }
}
