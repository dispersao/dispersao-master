import createCachedSelector from 're-reselect'
import { createSelector } from 'reselect'

import {
  getScriptsequences,
  formatScriptsequenceData
} from '../scriptsequences/selectors'

import { getSequences } from '../sequences/selectors'

const getState = (state) => state.scripts
const getId = (state, props) => props.id

export const getScriptId = (state, props) => props.script

const getScripts = createSelector(
  [getState], (state) => {
    if (!state) {
      return 
    }
    return state.get('data')
  }
)

const fetchScriptFromIdNotFormated = (list, id) => {
  if (!list || !list.size || !id) {
    return
  }
  return list.get(id.toString())
}

const fetchScriptFromIdFormated = (list, scriptsequences, sequences, id) => {
  let script = fetchScriptFromIdNotFormated(list, id)
  if (script && scriptsequences && sequences && sequences.size) {
    return formatScriptData(script, scriptsequences, sequences)
  }
}

export const getScriptList = createSelector(
  [getScripts], (scripts) => {
    if (!scripts) {
      return 
    }
    return scripts.valueSeq()
  }
)

export const getScriptByScriptId = createCachedSelector(
  [getScripts, getScriptId], (list, id) => {
    if (!list || !list.size || !id) {
      return
    }
    console.log(list.get(id.toString()))
    return list.get(id.toString())
  }
)(getScriptId)

export const getScriptById = createCachedSelector(
  [getScripts, getScriptsequences, getSequences, getId], 
  fetchScriptFromIdFormated
)(getId)

const formatScriptData = (script, scrList, seqList) => {
  let scriptsequences = script.get('scriptsequences').map( id => {
    return scrList.get(id.toString())
  }).map(scriptsequence => {
    return formatScriptsequenceData(scriptsequence, seqList.get(scriptsequence.get('sequence').toString()))
  })


  let totalTime = scriptsequences
    .map(el => parseInt(el.getIn(['sequence', 'duration'])))
    .reduce((a, b) => a + b) || 0

  const averageSeconds = parseInt(script.get('averagetime')) * 60

  scriptsequences = scriptsequences.map((scr, key) => {
    let isLast = averageSeconds <= totalTime && key === scriptsequences.size - 1
    return scr.set('isLast', isLast)
  })

  let elapsedTime = 0
  const playingSequences = scriptsequences.filter(el => el.get('progress') && el.get('progress') > 0)
  if (playingSequences && playingSequences.size) {
    const playingSequence = playingSequences.get(playingSequences.size - 1)
    elapsedTime = scriptsequences
      .slice(0, scriptsequences.indexOf(playingSequence) + 1)
      .map(el => {
        let progress  = el.get( 'progress') || 0
        progress = progress / 100
        return progress * el.getIn(['sequence', 'duration'])
      })
      .reduce((a, b) => a + b)
  }

  const remainingTime = totalTime - elapsedTime

  const speed = script.get('speed') || "1"

  script = script.set('scriptsequences', scriptsequences)

  return script.mergeDeep({
    totalTime,
    elapsedTime,
    remainingTime,
    averageSeconds,
    speed
  })
}
