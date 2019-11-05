import createCachedSelector from 're-reselect'
import { createSelector } from 'reselect'

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

const fetchScriptFromId = (list, id) => {
  if (!list || !list.size || !id) {
    return
  }
  let script = list.get(id.toString())
  return formatScriptData(script)
}

export const getScriptList = createSelector(
  [getScripts], (scripts) => {
    if (!scripts) {
      return 
    }
    return scripts.valueSeq().map(script => formatScriptData(script))
  }
)

export const getScriptByScriptId = createCachedSelector(
  [getScripts, getScriptId], fetchScriptFromId
)(getScriptId)

export const getScriptById = createCachedSelector(
  [getScripts, getId], fetchScriptFromId
)(getId)

const formatScriptData = (script) => {
  return script
}
