import createCachedSelector from 're-reselect'
import { createSelector } from 'reselect'

const getState = (state) => state.filters
const getCurrentScriptId = (state, props) => state.scripts.get('current')

const getData = (state, props) => props.data
const getType = (state, props) => props.type

export const getCurrentScriptIdFilters = createSelector(
  [getState, getCurrentScriptId],
  (filters, script) => {
    if (!filters || !filters.size || !script) {
      return
    }
    return filters.filter((filter) => filter.get('script') === script)
  }
)

export const getFilterByProps = createCachedSelector(
  [getCurrentScriptIdFilters, getData, getType, getCurrentScriptId],
  (filters, data, type) => {
    if (!filters || !filters.size || !data) {
      return
    } else {
      return filters.find((filter) => {
        return (
          filter.get('data') === data && (!type || filter.get('type') === type)
        )
      })
    }
  }
)((state, props) =>
  JSON.stringify({ ...props, script: state.scripts.get('current') })
)
