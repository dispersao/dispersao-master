import createCachedSelector from 're-reselect'
import { createSelector } from 'reselect'

const getState = (state) => state.comments
const getId = (state, props) => props.id
const getCommentId = (state, props) => props.comment

export const getCommentsList = createSelector(
  [getState], (state) => {
    if (!state) {
      return 
    }
    return state.get('data')
  }
)

const fetchCommentById = (list, id) => {
  if (!list || !list.size || !id) {
    return
  }
  return list.get(id.toString())
}

export const getCommentById = createCachedSelector(
  [getCommentsList, getId], fetchCommentById
)(getId)

export const getCommentByCommentId = createCachedSelector(
  [getCommentsList, getCommentId], fetchCommentById
)(getCommentId)
