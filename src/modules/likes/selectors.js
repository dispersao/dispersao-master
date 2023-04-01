import createCachedSelector from 're-reselect'
import { createSelector } from 'reselect'
import { getCurrentScriptId } from '../scripts/selectors'
import {
  getCurrentScriptPublishedSessioncontentsIds,
  getCurrentScriptSessioncontentsListByType
} from '../sessioncontents/selectors'

const getState = (state) => state.likes.get('data')
const getSessioncontentId = (state, props) => props.id

export const getLikesBySessioncontentId = createCachedSelector(
  [getState, getSessioncontentId],
  (likes, sessioncontent) => {
    if (!likes || !sessioncontent) {
      return
    }
    return likes.filter((like) => like.get('sessioncontent') === sessioncontent)
  }
)(getSessioncontentId)

export const getDislikesCountBySessioncontentId = createCachedSelector(
  [getLikesBySessioncontentId],
  (likes) => {
    if (!likes) {
      return 0
    }

    return likes.filter((like) => like.get('dislike')).size
  }
)(getSessioncontentId)

export const getLikesCountBySessioncontentId = createCachedSelector(
  [getLikesBySessioncontentId],
  (likes) => {
    if (!likes) {
      return 0
    }
    return likes.filter((like) => !like.get('dislike')).size
  }
)(getSessioncontentId)

export const getCurrentscriptLikes = createSelector(
  [getState, getCurrentScriptPublishedSessioncontentsIds ],
  (likes, sessioncontents) => {
    if (!likes || !likes.size || !sessioncontents || !sessioncontents.size) {
      return 
    }
    return likes
      .filter((like) => sessioncontents.includes(like.get('sessioncontent')))
  }
)
export const getCurrentscriptLikesUniqueUsersCount = createSelector(
  [getCurrentscriptLikes],
  (likes) => {
    if (!likes || !likes.size) {
      return 0
    }
    return likes
      .map((like) => like.get('appuser'))
      .toSet().size
  }
)

export const getCurrentScriptTotalLikes = createSelector(
  [getCurrentscriptLikes],
  (likes) => {
    if (!likes || !likes.size) {
      return 0
    }
    return likes.size
  
  }
)
