import createCachedSelector from 're-reselect'
import { createSelector } from 'reselect'

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

export const getLikesAppusersCount = createSelector([getState], (likes) => {
  if (!likes) {
    return
  }
  return likes.map((like) => like.get('appuser')).toSet().size
})
