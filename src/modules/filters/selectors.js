import createCachedSelector from 're-reselect'
import { createSelector } from 'reselect'

const getState = (state) => state.filters
const getCurrentScript = (state, props) => state.scripts.get('current')

const getData = (state, props) => props.data
const getType = (state, props) => props.type
const getScript = (state, props) => props.script

export const getFiltersByScriptId = createCachedSelector(
  [getState, getScript],
  (filters, script) => {
    if (!filters || !filters.size || !script) {
      return
    }
    return filters
      .filter((filter) => filter.get('script') === script)
      .valueSeq()
  }
)(getScript)

export const getCurrentScriptFilters = createSelector(
  [getState, getCurrentScript],
  (filters, script) => {
    if (!filters || !filters.size || !script) {
      return
    }
    return filters
      .filter((filter) => filter.get('script') === script)
      
  }
)

export const getFilterByProps = createCachedSelector(
  [getCurrentScriptFilters, getData, getType, getCurrentScript],
  (filters, data, type) => {
    if (!filters || !filters.size || !data) {
      return
    } else {
      return filters.find((filter) => {
        return filter.get('data') === data &&
          (!type || filter.get('type') === type)
      })
    }
  }
)((filters, data, type, script) => JSON.stringify([script, data, type]))
