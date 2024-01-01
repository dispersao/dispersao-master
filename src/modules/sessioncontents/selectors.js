import createCachedSelector from 're-reselect'
import { createSelector } from 'reselect'
import { createArraySelector } from '../../utils/selectorUtils'

import { getPosts } from '../posts/selectors'
import { getComments } from '../comments/selectors'

const getCurrentScriptId = (state, props) => state.scripts.get('current')
const getState = (state) => state.sessioncontents

const getId = (state, props) => props.id
const getType = (state, props) => props.type
const getTypes = (state, props) => props.types

export const getSessioncontents = createSelector([getState], (state) => {
  if (!state) {
    return
  }
  return state.get('data')
})

export const getCurrentScriptPublishedSessioncontents = createArraySelector(
  [getCurrentScriptId, getSessioncontents],
  (script, sessioncontents) => {
    if (!script || !sessioncontents) {
      return
    }
    return sessioncontents
      .filter((sescon) => sescon.get('script').toString() === script && sescon.get('state') === 'published')
      .valueSeq()
  }
)

export const getCurrentScriptPublishedSessioncontentsIds = createArraySelector(
  [getCurrentScriptPublishedSessioncontents],
  (sessioncontents) => {
    if(!sessioncontents){
      return
    }
    return sessioncontents.map(sescon => sescon.get('id'))
  }
)


export const getCurrentScriptPostSessioncontents = createArraySelector(
  [getCurrentScriptId, getSessioncontents],
  (script, sessioncontents) => {
    if (!script || !sessioncontents) {
      return
    }
    return sessioncontents
      .filter((sescon) => sescon.get('script').toString() === script && sescon.get('post'))
      .sortBy(el => el.get('programmed_at'))
      .valueSeq()
  }
)

export const getCurrentScriptPostSessioncontentsIds = createArraySelector(
  [getCurrentScriptPostSessioncontents],
  (sessioncontents) => {
    if(!sessioncontents){
      return
    }
    return sessioncontents.map(sescon => sescon.get('id'))
  }
)


export const getCurrentScriptProfileSessioncontents = createArraySelector(
  [getCurrentScriptId, getSessioncontents],
  (script, sessioncontents) => {
    if (!script || !sessioncontents) {
      return
    }
    return sessioncontents
      .filter((sescon) => sescon.get('script').toString() === script && sescon.get('profile'))
      .sortBy(el => el.get('programmed_at'))
      .valueSeq()
  }
)

export const getCurrentScriptProfileSessioncontentsIds = createArraySelector(
  [getCurrentScriptProfileSessioncontents],
  (sessioncontents) => {
    if(!sessioncontents){
      return
    }
    return sessioncontents.map(sescon => sescon.get('id'))
  }
)

export const getCurrentScriptSessioncontentsListByType = createCachedSelector(
  [getSessioncontents, getType, getCurrentScriptId],
  (sessioncontents, type, script) => {
    if (!sessioncontents || !type || !script) {
      return
    }
    return sessioncontents
      .filter((sescon) => sescon.get('script') === script)
      .filter((sescon) => sescon.get(type))
      .valueSeq()
  }
)(getType)

export const getSessioncontentById = createSelector(
  [getSessioncontents, getId],
  (sessioncontents, id) => {
    if (!sessioncontents || !id) {
      return
    } else {
      return sessioncontents.get(id.toString())
    }
  }
)

export const getPostSessioncontentCommentSessioncontentsById =
  createCachedSelector(
    [getId, getSessioncontents, getPosts, getComments],
    (id, sessioncontents, posts, comments) => {
      if (!id || !sessioncontents || !posts || !comments) {
        return
      }
      const sessioncontent = sessioncontents.get(id.toString())
      const postId = sessioncontent.get('post').toString()
      const scriptId = sessioncontent.get('script').toString()
      if (postId && scriptId) {
        const relatedComments = comments
          .filter((c) => c.get('post').toString() === postId)
          .map((c) => c.get('id'))
        return sessioncontents.filter(
          (sc) =>
            sc.get('script').toString() === scriptId &&
            relatedComments.includes(sc.get('comment'))
        )
      }
    }
  )(getId)

export const getPostSessioncontentCommentSessioncontentsIdsById =
  createCachedSelector(
    [getPostSessioncontentCommentSessioncontentsById],
    (commentSessioncontents) => {
      if (!commentSessioncontents) {
        return
      }
      return commentSessioncontents.map((sc) => sc.get('id'))
    }
  )(getId)


export const getNextContentToPublish = createSelector(
  [getSessioncontents, getTypes, getCurrentScriptId],
  (sessioncontents, types, script) => {
   
    if (!sessioncontents || !types || !script) {
      return
    }
    return sessioncontents
      .filter((sescon) => sescon.get('script').toString() === script.toString())
      .filter((sescon) => types.some((type) => sescon.get(type)))
      .filter((sescon) => sescon.get('state') === 'pending')
      .sort((a, b) => a.get('programmed_at') - b.get('programmed_at'))
      .first()
  }
)
