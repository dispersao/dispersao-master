import createCachedSelector from 're-reselect'
import { createSelector } from 'reselect'
import { List } from 'immutable'

import { getPostByPostIdFormatted } from '../posts/selectors'

const getCleanState = (state) => state
const getState = (state) => state.sessioncontents
const getIds = (state, props) => props.sessioncontents.map(sescon => sescon.id)
const getScript = (state, props) =>  props.id
const getType = (state, props) =>  props.type
const getTypes = (state, props) =>  props.types
const getIdsAsJson = (state, props) => JSON.stringify(props.sessioncontents)

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

export const getSessioncontentsListByType = createCachedSelector(
  [getSessioncontents, getType, getScript],
  (sessioncontents, type, script) => {
    console.log()
    if (!sessioncontents || !type || !script ) {
      return
    }
    return sessioncontents
      .filter(sescon => sescon.get('script') === script)
      .filter(sescon => sescon.get(type))
      .valueSeq()
  }
)(getScript)

export const getSessioncontentsListAsPosts = createCachedSelector(
  [getIds,  getSessioncontents, getCleanState], 
  (ids, sessioncontents, state) => {
    if (!ids || !sessioncontents || !sessioncontents.size) {
      return
    }
    const list = ids
      .map(id => sessioncontents.get(id.toString()))

    const publishedComents = list
      .map(sescon => sescon.get('comment'))
      .filter(Boolean)

    const ret = list
      .filter(sescon => sescon.get('post'))
      .map(sescon => {
        const post = sescon.get('post')
        return sescon.mergeDeep({
          post: getPostByPostIdFormatted(state, { post })
        })
      })
      .map(sescon => {
        const comments = sescon.get('post').get('comments')
          .filter(comment => {
            return publishedComents.includes(comment.get('id'))
          })
          .map(comment => {
            const sesconCom = list.find(ssco => ssco.get('comment') === comment.get('id'))
            return sesconCom.mergeDeep({
              comment
            })
          })

        return sescon.setIn(['post', 'comments'], comments)
      })
    return List(ret)
  }
)(getIdsAsJson)

export const getNextContentToPublish = createCachedSelector(
  [getSessioncontents, getTypes, getScript],
  (sessioncontents, types, script) => {
    if (!sessioncontents || !types || !script) {
      return
    }
    return sessioncontents
      .filter(sescon => sescon.get('script') === script)
      .filter(sescon => types.some(type => sescon.get(type)))
      .filter(sescon => sescon.get('state') === 'pending')
      .sort((a, b) => a.get('programmed_at') - b.get('programmed_at'))
      .first()
  }
)(getScript)

