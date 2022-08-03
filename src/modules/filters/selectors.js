import createCachedSelector from 're-reselect'

const getState = (state) => state.filters
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

export const getFilterByProps = createCachedSelector(
  [getFiltersByScriptId, getData, getType, getScript],
  (filters, data, type) => {
    console.log(filters, data, type)
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
