import {
  map,
  uniq,
  intersection
} from 'lodash'

import {
  getEntityCategoriesByType,
  mapCategoryToText,
  getSequenceInPosition
} from './formatData'

const categories = {
  block: 'blocks',
  blockNext:'blocks-next',
  block2ndNext: 'blocks-2nd-next',
  require: 'requires'
}

export const filterSequences = (scriptSequences, unselectedSequences) => {
  let availableSequences = filterByBlock(scriptSequences, unselectedSequences)
  availableSequences = filterByRequire(scriptSequences, availableSequences)
  availableSequences = filterByBlockGroups(scriptSequences, availableSequences)
  availableSequences = filterByCharsAndLocation(scriptSequences, availableSequences)
  return availableSequences
}

/*-- FILTER OUT BLOCKED SEQUENCES BY SCRIPT SEQUENCES --*/    
const filterByBlock = (scriptSequences, availableSequences) => {
  let blockCategories = scriptSequences.map(seq => {
    return getEntityCategoriesByType(seq, categories.block)
  }).flatten()
  blockCategories = uniq(mapCategoryToText(blockCategories))

  return availableSequences.filter(seq => !blockCategories.includes(seq.sceneNumber))
}

/*-- FILTER OUT SEQUENCES THAT REQUIRE UNSELECTED SEQUENCES --*/
const filterByRequire = (scriptSequences, availableSequences) => {
  let scriptSequencesSceneNumbers = map(scriptSequences, 'sceneNumber')

  return availableSequences.filter(seq => {
    let required = getEntityCategoriesByType(seq, categories.require)
    required = mapCategoryToText(required)

    return required.every(reqId => scriptSequencesSceneNumbers.includes(reqId))
  })
}

/*-- FILTER OUT SEQUENCES BELONGING TO SAME BLOCK-NEXT OR BLOCK-2ND-NEXT GROUPS --*/
const filterByBlockGroups = (scriptSequences, availableSequences) => {
  const lastSeq = getSequenceInPosition(scriptSequences, -1)
  const secondLastSeq = getSequenceInPosition(scriptSequences, -2)

  let avSequences = filterByBlockGroup([lastSeq], categories.blockNext, availableSequences)
  avSequences = filterByBlockGroup([secondLastSeq, lastSeq], categories.block2ndNext, availableSequences)
  return avSequences
}

const filterByBlockGroup = (checkSequences, field, availableSequences) => {
  if (checkSequences.some(seq => !seq)) {
    return availableSequences
  }

  let checkValues = checkSequences
    .map(seq => getEntityCategoriesByType(seq, field))
    .map(cats => map(cats, 'id'))
    .flatten()

  return availableSequences.filter(seq => {
    const seqCheckValue = map(getEntityCategoriesByType(seq, field), 'id')
    return !intersection(seqCheckValue, checkValues).length
  })
}

/*-- FILTER OUT SEQUENCES ON SAME LOCATION WITH SAME CHARS --*/
const filterByCharsAndLocation = (scriptSequences, availableSequences) => {
  const lastSeq = getSequenceInPosition(scriptSequences, -1)
  if (!lastSeq) {
    return availableSequences
  }

  const lastLocation = lastSeq.location.id
  const lastCharacters = map(lastSeq.characters, 'id')

  return availableSequences.filter(seq => {
    const seqLocation = seq.location.id
    const seqCharacters = map(seq.characters, 'id')

    const sameLocation = seqLocation === lastLocation
    const sameCharacters = intersection(lastCharacters, seqCharacters).length === lastCharacters.length

    return !(sameLocation && sameCharacters)
  })
}

