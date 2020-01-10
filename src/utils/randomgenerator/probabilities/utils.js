import {
  orderBy,
} from 'lodash'


import {
  getEntityCategoriesByType,
  mapCategoryToText
} from '../formatData'


const categories = {
  position: 'pos'
}

/**
 * SETS CLOSEST category "position" VALUE TO CURRENT POSITION
 * @param {Array} position 
 * @param {Array} sequences 
 */
export const setEntityClosestPosition = (position, entities) => {
  return entities.map(entity => {

    let positionCategories = getEntityCategoriesByType(entity, categories.position)
    positionCategories = mapCategoryToText(positionCategories)
    
    positionCategories = positionCategories
      .map(cat => parseInt(cat))
      .map(cat => ({
        closestPosition: cat,
        positionDistance: Math.abs(position - cat)
      }))
    
    positionCategories = orderBy(positionCategories, 'positionDistance')

    const closestPosition = positionCategories[0]

    return {
      ...entity,
      ...closestPosition
    }
  })
}
