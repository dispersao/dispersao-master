import createCachedSelector from 're-reselect'
import { createSelector } from 'reselect'

import { Map } from 'immutable'

import {
  getScriptsequences,
  formatScriptsequenceData
} from '../scriptsequences/selectors'

import { getSequences } from '../sequences/selectors'
import { getSessioncontents } from '../sessioncontents/selectors'


const getState = (state) => state.scripts
const getId = (state, props) => props.id

export const getCurrentScript = (state) => state.scripts.get('current')

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

const fetchScriptFromIdFormated = (list, scriptsequences, scriptTimes, sessioncontents, id) => {
  let script = fetchScriptFromIdNotFormated(list, id)
  if (script && scriptsequences && sessioncontents && scriptTimes) {
    return formatScriptData(script, scriptsequences, scriptTimes, sessioncontents)
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

const getScriptSequencesFormated = createCachedSelector(
  [getScripts, getScriptsequences, getSequences, getId],
  (scripts, scriptsequences, sequences, id) => {
    if (!scripts || !scripts.size || !scriptsequences || !sequences || !sequences.size || !id ) {
      return
    }
    const script = fetchScriptFromIdNotFormated(scripts, id)
    return script
      .get('scriptsequences')
      .map( id => scriptsequences.get(id.toString()))
      .map(scriptsequence => {
        return formatScriptsequenceData(
          scriptsequence, 
          sequences.get(
            scriptsequence.get('sequence').toString()
          )
        )
      })
  }
)(getId)

export const getScriptTimes = createCachedSelector(
  [getScripts, getScriptSequencesFormated, getId], 
  (scripts, scriptsequences, id) => {
    if (!scripts || !scripts.size || !scriptsequences || !id) {
      return
    }
    const script = fetchScriptFromIdNotFormated(scripts, id)

    const totalTime = scriptsequences
      .map(el => parseInt(el.getIn(['sequence', 'duration'])))
      .reduce((a, b) => a + b) || 0

    const averageSeconds = parseInt(script.get('averagetime')) * 60

    let elapsedTime = 0
    const playingSequences = scriptsequences.filter(el => el.get('elapsedTime') && el.get('elapsedTime') > 0)
    
    if (playingSequences && playingSequences.size) {
      const playingSequence = playingSequences.get(playingSequences.size - 1)
      
      elapsedTime = scriptsequences
        .slice(0, scriptsequences.indexOf(playingSequence) + 1)
        .map(el => {
          return el.get( 'elapsedTime') || 0
        })
        .reduce((a, b) => a + b)
    }

    const remainingTime = totalTime - elapsedTime

    const speed = script.get('speed') || "1"

    return Map({
      totalTime,
      elapsedTime,
      remainingTime,
      averageSeconds,
      speed
    })
  }
)(getId)


export const getScriptByScriptId = createCachedSelector(
  [getScripts, getScriptId], (list, id) => {
    if (!list || !list.size || !id) {
      return
    }
    return list.get(id.toString())
  }
)(getScriptId)


export const getScriptById = createCachedSelector(
  [getScripts, getScriptSequencesFormated, getScriptTimes, getSessioncontents, getId],
  fetchScriptFromIdFormated
)(getId)



const formatScriptData = (script, scrList, scriptTimes, sesconList) => {
  const sessioncontents = script
    .get('sessioncontents')
    .map(id => sesconList.get(id.toString()))

  let scriptsequences = scrList.map((scr, key) => {
    let isLast = scriptTimes.get('averageSeconds') <= scriptTimes.get('totalTime') && key === scrList.size - 1
    return scr.set('isLast', isLast)
  })

  console.log(script.get('appdata'))

  return script
    .setIn(['scriptsequences'], scriptsequences)
    .setIn(['sessioncontents'], sessioncontents)
    .mergeDeep(scriptTimes)
}
