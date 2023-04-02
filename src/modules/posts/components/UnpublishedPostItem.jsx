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
import CommentList from '../../comments/components/CommentList.jsx'
import Republisher from '../../sessioncontents/componentes/Republisher.jsx'

const UnpublishedPostItem = ({
  id,
  isPublished = false,
  comments = [],
  publishedComments = []
}) => {
  const allow_republish = ALLOW_REPUBLISH

  if (isPublished && comments.length === publishedComments.length) {
    return null
  } else {
    return (
      <PostListItem id={id} disabled={isPublished}>
        {(allow_republish && !isPublished && (
          <Republisher contentType="post" contentId={id} />
        )) ||
          null}
        {(comments.length && (
          <CommentList>
            {comments.map((comment, key) => (
              <CommentListItem
                id={comment}
                key={key}
                disabled={publishedComments.includes(comment)}
              >
                {(isPublished && allow_republish && (
                  <Republisher contentType="comment" contentId={comment} />
                )) ||
                  null}
              </CommentListItem>
            ))}
          </CommentList>
        )) ||
          null}
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
