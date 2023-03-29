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

import { GridListTile, GridList, Typography, Grid } from '@material-ui/core'

import { toHHMMSS } from '../../../utils/stringUtils'
import useStyles from './styles/'
import Republisher from './Republisher.jsx'

const SessioncontentGridItem = ({
  postSessioncontent: { id, programmed_at, state, post },
  commentsSessioncontents
}) => {
  const allow_republish = ALLOW_REPUBLISH

  const classes = useStyles()

  let color, text, classname

  if (state === 'pending') {
    color = 'secondary'
    text = `programmed to: ${toHHMMSS(programmed_at)}`
    classname = 'item-pending'
  } else {
    color = 'primary'
    text = `published at: ${toHHMMSS(programmed_at)}`
    classname = 'item'
  }
  return (
    <GridListTile className={classes[classname]}>
      <Grid container direction="column">
        <Grid item xs>
          <Grid container direction="row">
            <Grid item xs>
              <Typography variant="body2" color={color}>
                {text}
              </Typography>
            </Grid>
            {(allow_republish && <Republisher id={id} state={state} />) || null}
          </Grid>
        </Grid>
        <GridList cellHeight="auto" cols={1}>
          <PostListItem id={post}>
            {Object.keys(commentsSessioncontents).map((commentSescon, key) => (
              <SessioncontentCommentItem id={commentSescon} key={key} />
            ))}
          </PostListItem>
        </GridList>
      </Grid>
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
  onRepublish: PropTypes.func,
  onUnpublish: PropTypes.func
}

const mapStateToProps = (state, ownProps) => ({
  postSessioncontent: getSessioncontentById(state, ownProps),
  commentsSessioncontents: getPostSessioncontentCommentSessioncontentsIdsById(
    state,
    ownProps
  )
})

export default connect(mapStateToProps, null)(toJS(SessioncontentGridItem))
