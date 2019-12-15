import map from 'lodash/map'
// import find from 'lodash/find'

export const getPlayedUnplayedSequencesFormated = (scriptMap, sequencesList) => {
  const script = scriptMap.toJS()
  const sequences = sequencesList.toJS()

  const scriptSequencesIds = script.scriptsequences.map(scr => scr.sequence.id)

  const scriptSequences = sequences.filter(seq => scriptSequencesIds.includes(seq.id))
  const availableSequences = sequences.filter(seq => !scriptSequencesIds.includes(seq.id))

  return {
    scriptSequences,
    availableSequences
  }
}

export const getCategoriesByType = (categoriesList, type) => {
  // console.log(categoriesList, type, categoriesList.filter(cat => cat.type === type))
  return categoriesList.filter(cat => cat.type === type)
}

export const getSeqCategoriesByType = (seq, type) => {
  if (!seq || !seq.categories) {
    console.log('no categories')
    return
  }
  return getCategoriesByType(seq.categories, type)
}

export const mapCategoryToText = (categoriesList) => {
  return map(categoriesList, 'text')
}

export const getSequenceInPosition = (sequences, position) => {
  if (position < 0) {
    return sequences[sequences.length + position]
  } else {
    sequences[position]
  }
}
