import { 
  getEntityCategoriesByType,
  mapCategoryToText
} from './formatData'

import uniq from 'lodash/uniq'

export const calculateNextPosition = (scriptequences, availablesequences, script) => {
  const highestPosition = Math.max(...uniq(
    scriptequences.concat(availablesequences)
      .map(seq => getEntityCategoriesByType(seq, 'pos'))
      .map(mapCategoryToText)
      .flatten()
  ).map(Number))

  const secondsPerPosition =  Number(script.get('averageSeconds')) / highestPosition

  const nextPosition = Math.round(Number(script.get('totalTime')) / secondsPerPosition) + 1
  
  console.log(`%c nextPosition: ${nextPosition}, currentTime: ${script.get('totalTime')}, secondsPerPosition: ${secondsPerPosition}`, 'color:#cec137')
  return nextPosition
}
