import store from '../../../store'

import {
  getScriptById
} from '../../scripts/selectors'

import { 
  sendScriptsequence,
  updateProgressScriptsequence
} from '../actions'
import { onUpdateScriptSequenceState } from './ScriptsequenceStateManager'

export const onGetScene = (script, index) => {
  console.log('onGetScene: ', script, index)
  const scriptsequence = getScriptSequenceByIndex(script, index)
  store.dispatch(sendScriptsequence(scriptsequence))
}

export const onSceneProgress = (script, index, progress) => {
  const scriptequence = getScriptSequenceByIndex(script, index)
  store.dispatch(updateProgressScriptsequence({
    id: scriptequence.id,
    progress
  }))
}

export const onSceneUpdateState = (script, index, state, prog) => {
  const scriptequence = getScriptSequenceByIndex(script, index)
  const { speed } = getScript(script)
  onUpdateScriptSequenceState(scriptequence, speed, state)
}

const getScript = (id) => {
  let script = getScriptById(store.getState(), { id })
  if (script) {
    return script.toJS()
  }
}


const getScriptSequenceByIndex = (id, index) => {
  let script = getScript(id)
  if (script) {
    const scriptSequence = script.scriptsequences.find(el => el.index === index)
    if (scriptSequence) {
      return scriptSequence
    } else {
      throw Error(`missing index ${index} at script ${script}`)
    }
  } else {
    console.log('no script')
    throw Error(`no script with id ${script}`)
  }
}

