import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { toJS } from '../../../utils/immutableToJs.jsx'
import {
  getPostCommentsIdsById,
  isPostPublished,
  getPostPublishedComment
} from '../selectors'

import PostListItem from './PostListItem.jsx'
import CommentListItem from '../../comments/components/CommentListItem.jsx'

const UnpublishedPostItem = ({
  id,
  isPublished = false,
  comments = [],
  publishedComments = []
}) => {
  if (isPublished && comments.length === publishedComments.length) {
    return null
  } else {
    console.log(id, isPublished, comments, publishedComments)
    return (
      <PostListItem id={id} disabled={isPublished}>
        {comments.map((comment, key) => (
          <CommentListItem
            id={comment}
            key={key}
            disabled={publishedComments.includes(comment)}
          />
        ))}
      </PostListItem>
    )
  }
}

UnpublishedPostItem.propTypes = {
  id: PropTypes.number,
  comments: PropTypes.arrayOf(PropTypes.number),
  isPublished: PropTypes.bool,
  publishedComments: PropTypes.arrayOf(PropTypes.number)
}

const mapStateToProps = (state, ownProps) => ({
  isPublished: isPostPublished(state, ownProps),
  comments: getPostCommentsIdsById(state, ownProps),
  publishedComments: getPostPublishedComment(state, ownProps)
})

export default connect(mapStateToProps, null)(toJS(UnpublishedPostItem))
