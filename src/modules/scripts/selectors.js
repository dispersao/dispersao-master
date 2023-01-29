import createCachedSelector from 're-reselect'
import { createSelector } from 'reselect'

import { Map } from 'immutable'

import {
  getScriptsequences,
  formatScriptsequenceData,
  getCurrentScriptScriptsequences
} from '../scriptsequences/selectors'

import { getSequenceList, getSequences } from '../sequences/selectors'
import { getSessioncontents } from '../sessioncontents/selectors'

const getState = (state) => state.scripts
const getId = (state, props) => props.id
const getField = (state, props) => props.field
export const getCurrentScriptId = (state) => state.scripts.get('current')

export const getScriptId = (state, props) => props.script

const getScripts = createSelector([getState], (state) => {
  if (!state) {
    return
  }
  return state.get('data')
})

export const getScriptIsLoaded = createSelector(
  [getId, getScripts],
  (id, scripts) => {
    if (!id || !scripts || !scripts.size) {
      return
    }
    return !!scripts.get(id.toString())
  }
)

const fetchScriptFromIdNotFormated = (list, id) => {
  if (!list || !list.size || !id) {
    return
  }
  return list.get(id.toString())
}

const fetchScriptFromIdFormated = (
  list,
  scriptsequences,
  scriptTimes,
  sessioncontents,
  id
) => {
  let script = fetchScriptFromIdNotFormated(list, id)
  if (script && scriptsequences && sessioncontents && scriptTimes) {
    return formatScriptData(
      script,
      scriptsequences,
      scriptTimes,
      sessioncontents
    )
  }
}

export const getScriptList = createSelector([getScripts], (scripts) => {
  if (!scripts) {
    return
  }
  return scripts.valueSeq()
})

const getScriptSequencesFormated = createCachedSelector(
  [getScripts, getScriptsequences, getSequences, getId],
  (scripts, scriptsequences, sequences, id) => {
    if (
      !scripts ||
      !scripts.size ||
      !scriptsequences ||
      !sequences ||
      !sequences.size ||
      !id
    ) {
      return
    }
    const script = fetchScriptFromIdNotFormated(scripts, id)
    return script
      .get('scriptsequences')
      .map((id) => scriptsequences.get(id.toString()))
      .filter(Boolean)
      .map((scriptsequence) => {
        return formatScriptsequenceData(
          scriptsequence,
          sequences.get(scriptsequence.get('sequence').toString())
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

    const totalTime =
      scriptsequences
        .map((el) => parseInt(el.getIn(['sequence', 'duration'])))
        .reduce((a, b) => a + b) || 0

    const averageSeconds = parseInt(script.get('averagetime')) * 60

    let elapsedTime = 0
    const playingSequences = scriptsequences.filter(
      (el) => el.get('elapsedTime') && el.get('elapsedTime') > 0
    )

    if (playingSequences && playingSequences.size) {
      const playingSequence = playingSequences.get(playingSequences.size - 1)

      elapsedTime = scriptsequences
        .slice(0, scriptsequences.indexOf(playingSequence) + 1)
        .map((el) => {
          return el.get('elapsedTime') || 0
        })
        .reduce((a, b) => a + b)
    }

    const remainingTime = totalTime - elapsedTime

    const speed = script.get('speed') || '1'

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
  [getScripts, getScriptId],
  (list, id) => {
    if (!list || !list.size || !id) {
      return
    }
    return list.get(id.toString())
  }
)(getScriptId)

export const getScriptById = createCachedSelector(
  [
    getScripts,
    getScriptSequencesFormated,
    getScriptTimes,
    getSessioncontents,
    getId
  ],
  fetchScriptFromIdFormated
)(getId)

const formatScriptData = (script, scrList, scriptTimes, sesconList) => {
  const sessioncontents = script
    .get('sessioncontents')
    .map((id) => sesconList.get(id.toString()))

  let scriptsequences = scrList.map((scr, key) => {
    let isLast =
      scriptTimes.get('averageSeconds') <= scriptTimes.get('totalTime') &&
      key === scrList.size - 1
    return scr.set('isLast', isLast)
  })
  return script
    .setIn(['scriptsequences'], scriptsequences)
    .setIn(['sessioncontents'], sessioncontents)
    .mergeDeep(scriptTimes)
}

export const getCurrentScriptIdFieldByFieldname = createSelector(
  [getCurrentScriptId, getScripts, getField],
  (currentScript, scripts, field) => {
    if (!currentScript || !scripts || !scripts.size || !field) {
      return
    }
    let retvalue = scripts.getIn([currentScript.toString(), field])
    if (field === 'speed') {
      retvalue = retvalue || '1'
    }
    return retvalue
  }
)

export const getCurrentScript = createSelector(
  [getCurrentScriptId, getScripts],
  (currentScript, scripts) => {
    if (!currentScript || !scripts || !scripts.size) {
      return
    }
    return scripts.get(currentScript.toString())
  }
)

export const getCurrentScriptElapsedTime = createSelector(
  [getCurrentScriptScriptsequences],
  (scriptsequences) => {
    if (!scriptsequences || !scriptsequences.size) {
      return 0
    }

    const playingSequences = scriptsequences.filter(
      (el) => el.get('elapsedTime') && el.get('elapsedTime') > 0
    )

    if (playingSequences && playingSequences.size) {
      const playingSequence = playingSequences.get(playingSequences.size - 1)

      return scriptsequences
        .slice(0, scriptsequences.indexOf(playingSequence) + 1)
        .map((el) => {
          return el.get('elapsedTime') || 0
        })
        .reduce((a, b) => a + b)
    } else {
      return 0
    }
  }
)

export const getCurrentScriptTotalTime = createSelector(
  [getCurrentScriptScriptsequences, getSequenceList],
  (scriptsequences, sequences) => {
    if(!scriptsequences || !sequences){
      return
    }
    return scriptsequences
      .map((el) => sequences.getIn([el.get('sequence').toString(), 'duration']))
      .reduce((a, b) => a + b) || 0
  }
)

export const getCurrentScriptRemainingTime = createSelector(
  [getCurrentScriptTotalTime, getCurrentScriptElapsedTime],
  (totalTime, elapsedTime) => {
    return totalTime - (elapsedTime||0)
  }
)

export const getCurrentSCriptLastScriptsequence = createSelector(
  [getCurrentScript, getCurrentScriptTotalTime, getCurrentScriptScriptsequences],
  (currentScript, totalTime, scriptsequences) => {
    if(!currentScript || !totalTime || !scriptsequences){
      return
    }
   
    const averageSeconds = parseInt(currentScript.get('averagetime')) * 60

    if(averageSeconds <= totalTime){
      return scriptsequences.get(scriptsequences.size - 1)
    }
  }
)
