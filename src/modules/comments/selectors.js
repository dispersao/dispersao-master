import createCachedSelector from 're-reselect'
import { createSelector } from 'reselect'
import { fromJS } from 'immutable'

import { sortEntity } from '../../utils/listUtils'

import { getContentcreatorsList } from '../contentcreators/selectors'

const getState = (state) => state.comments
const getId = (state, props) => props.id
const getCommentId = (state, props) => props.comment

export const getComments = createSelector([getState], (state) => {
  if (!state) {
    return
  }
  return state.get('data')
})

export const getCommentContentcreatorByCommentId = createCachedSelector(
  [getId, getComments, getContentcreatorsList],
  (id, comments, contentcreators) => {
    if (!id || !comments || !contentcreators) {
      return
    }
    return contentcreators.get(
      comments.get(id.toString()).get('contentcreator').toString()
    )
  }
)(getId)

export const getCommentsList = createSelector([getComments], (coments) => {
  if (!coments) {
    return
  }
  return coments.valueSeq()
})

export const getCommentsListFormatted = createSelector(
  [getComments, getContentcreatorsList],
  (comments, contentcreators) => {
    const lists = [comments, contentcreators]
    const anyEmpty = lists.some((list) => !list || !list.size)

    if (anyEmpty) {
      return
    }

    return comments
      .valueSeq()
      .sort(sortEntity)
      .map((comment) => formatCommentForAlgorithm(comment, contentcreators))
  }
)

const fetchCommentById = (list, id) => {
  if (!list || !list.size || !id) {
    return
  }
  return list.get(id.toString())
}

export const getCommentById = createCachedSelector(
  [getComments, getId],
  fetchCommentById
)(getId)

export const getCommentByCommentId = createCachedSelector(
  [getCommentsList, getCommentId],
  fetchCommentById
)(getCommentId)

const formatCommentForAlgorithm = (comment, contentcreatorsList) => {
  const contentcreator = contentcreatorsList.get(
    comment.get('contentcreator').toString()
  )

  return comment.mergeDeep(
    fromJS({
      contentcreator
    })
  )
}
