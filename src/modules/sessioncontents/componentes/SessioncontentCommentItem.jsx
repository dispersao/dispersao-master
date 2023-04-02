import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { toJS } from '../../../utils/immutableToJs.jsx'

import CommentListItem from '../../comments/components/CommentListItem.jsx'

import useStyles from './styles/'

import { GridListTile, Grid, GridList } from '@material-ui/core'

import { getSessioncontentById } from '../selectors.js'
import SessioncontentInfo from './SessioncontentInfo.jsx'

const SessioncontentCommentItem = ({
  commentSessioncontent,
  isParentPublished = false
}) => {
  const { comment, state } = commentSessioncontent
  const classes = useStyles()

  const classnames = [
    classes.item,
    state === 'pending' ? classes.pending : ''
  ].filter(Boolean)

  return (
    <GridListTile className={classnames.join(' ')}>
      <GridList cellHeight="auto" cols={1}>
        <CommentListItem id={comment}>
          <SessioncontentInfo
            {...commentSessioncontent}
            renderLikes={false}
            renderRepublish={isParentPublished}
          />
        </CommentListItem>
      </GridList>
    </GridListTile>
  )
}

SessioncontentCommentItem.propTypes = {
  commentSessioncontent: PropTypes.shape({
    comment: PropTypes.number,
    state: PropTypes.string,
    programmed_at: PropTypes.number
  }),
  onRepublish: PropTypes.func,
  onUnpublish: PropTypes.func
}

const mapStateToProps = (state, ownProps) => ({
  commentSessioncontent: getSessioncontentById(state, ownProps)
})

export default connect(mapStateToProps)(toJS(SessioncontentCommentItem))
