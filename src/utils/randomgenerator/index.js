import { 
  getPlayedUnplayedSequencesFormated
} from './formatData'

import {
  filterSequences
} from './filterSequences'

export const getNextRandomSequence = (script, sequences) => {

  let {
    scriptSequences, 
    availableSequences
  } = getPlayedUnplayedSequencesFormated(script, sequences)

  availableSequences = filterSequences(scriptSequences, availableSequences)

  let seed =  Math.floor(Math.random() * availableSequences.length)
  let seq = availableSequences[seed]

  // let seq = availableSequences.find(s => s.sceneNumber === '2' || s.sceneNumber === '64')
  // let seq = availableSequences.find(s => s.sceneNumber === '3' || s.sceneNumber === '31' || s.sceneNumber === '86')
  if (!seq) seq = availableSequences[0]
  return {
    index: scriptSequences.length,
    sequence: seq,
    script: script.get('id')
  }
}


