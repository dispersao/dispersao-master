import createCachedSelector from 're-reselect'
import { createSelector } from 'reselect'

import { getPostByPostIdFormatted } from '../posts/selectors'

const getCleanState = (state) => state
const getState = (state) => state.sessioncontents
const getIds = (state, props) => props.statecontents

const getIdsAsJson = (state, props) => JSON.stringify(props.statecontents)

export const getSessioncontents = createSelector(
  [getState], (state) => {
    if (!state) {
      return
    }
    return state.get('data')
  }
)

export const getSessioncontentsList = createSelector(
  [getSessioncontents], (sessioncontents) => {
    if (!sessioncontents) {
      return 
    }
    return sessioncontents.valueSeq()
  }
)

export const getSessioncontentsListAsPosts = createCachedSelector(
  [getIds,  getSessioncontentsList, getCleanState], 
  (ids, sessioncontents, state) => {
    if (!ids || !sessioncontents || !sessioncontents.size) {
      return
    }
    const list = ids
      .map(id => sessioncontents.get(id.toString()))

    const publishedComents = list
      .map(sescon => sescon.get('comment'))
      .filter(Boolean)

    return list
      .filter(sescon => sescon.get('post'))
      .map(sescon => {
        const post = sescon.get('post')
        return sescon.mergeDeep({
          post: getPostByPostIdFormatted(state, { post })
        })
      })
      .map(sescon => {
        const comments = sescon.get('comments')
          .filter(comment => {
            return publishedComents.includes(comment.get('id'))
          })
        return sescon.setIn(['comments'], comments)
      })
  }
)(getIdsAsJson)



