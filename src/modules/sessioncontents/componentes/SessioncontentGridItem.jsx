import React from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'

import PostListItem from '../../posts/components/PostListItem.jsx'
import SessioncontentCommentItem from './SessioncontentCommentItem.jsx'
import { toJS } from '../../../utils/immutableToJs.jsx'

import {
  getPostSessioncontentCommentSessioncontentsIdsById,
  getSessioncontentById
} from '../selectors'

import { GridListTile, GridList } from '@material-ui/core'

import useStyles from './styles/'
import CommentList from '../../comments/components/CommentList.jsx'
import SessioncontentInfo from './SessioncontentInfo.jsx'

const SessioncontentGridItem = ({
  postSessioncontent,
  commentsSessioncontents
}) => {
  const { post, state } = postSessioncontent

  const classes = useStyles()

  const classnames = [
    classes.item,
    state === 'pending' ? 'pending' : ''
  ].filter(Boolean)

  return (
    <GridListTile className={classnames.join(' ')}>
      <GridList cellHeight="auto" cols={1}>
        <PostListItem id={post}>
          <SessioncontentInfo
            {...postSessioncontent}
          />
          {(Object.keys(commentsSessioncontents).length && (
            <CommentList>
              {Object.keys(commentsSessioncontents).map(
                (commentSescon, key) => (
                  <SessioncontentCommentItem id={commentSescon} key={key} />
                )
              )}
            </CommentList>
          )) ||
            null}
        </PostListItem>
      </GridList>
    </GridListTile>
  )
}

SessioncontentGridItem.propTypes = {
  postSessioncontent: PropTypes.shape({
    post: PropTypes.number.isRequired,
    state: PropTypes.string.isRequired,
    programmed_at: PropTypes.number
  }).isRequired,
  commentsSessioncontents: PropTypes.object,
  
}

const mapStateToProps = (state, ownProps) => ({
  postSessioncontent: getSessioncontentById(state, ownProps),
  commentsSessioncontents: getPostSessioncontentCommentSessioncontentsIdsById(
    state,
    ownProps
  )
})

export default connect(mapStateToProps, null)(toJS(SessioncontentGridItem))
