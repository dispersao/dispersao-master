import createCachedSelector from 're-reselect'
import { createSelector } from 'reselect'

const getState = (state) => state.scripts
const getScriptId = (state, props) => props.id

const getScripts = createSelector(
  [getState], (state) => {
    if (!state) {
      return 
    }
    return state.get('data')
  }
)

export const getScriptList = createSelector(
  [getScripts], (scripts) => {
    if (!scripts) {
      return 
    }
    return scripts.valueSeq().map(script => formatScriptData(script))
  }
)

export const getScriptById = createCachedSelector(
  [getScripts, getScriptId], 
  (list, id) => {
    if (!list || !list.size || !id) {
      return
    }
    let script = list.get(id.toString())
    console.log(formatScriptData(script))
    return formatScriptData(script)
  }
)(getScriptId)

const formatScriptData = (script) => {
  return script
}
