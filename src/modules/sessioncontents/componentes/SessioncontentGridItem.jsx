import React from 'react'
import PropTypes from 'prop-types'

import { Publish, Refresh, Delete } from '@material-ui/icons'

import PostListItem from '../../posts/components/PostListItem.jsx'
import SessioncontentCommentItem from './SessioncontentCommentItem.jsx'

import SessioncontentPublisher from './HOC/SessioncontentPublisher.jsx'

import {
  GridListTile,
  GridList,
  Typography,
  Grid,
  IconButton
} from '@material-ui/core'

import { toHHMMSS } from '../../../utils/stringUtils'
import useStyles from './styles/'

const SessioncontentGridItem = ({
  post,
  state,
  programmed_at,
  onRepublish,
  onUnpublish
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
            {(allow_republish && (
              <Grid item xs>
                <IconButton fontSize="small" onClick={onRepublish}>
                  {(state === 'pending' && <Publish />) || null}
                  {(state === 'published' && <Refresh />) || null}
                </IconButton>
                {(state === 'published' && (
                  <IconButton fontSize="small" onClick={onUnpublish}>
                    <Delete />
                  </IconButton>
                )) ||
                  null}
              </Grid>
            )) ||
              null}
          </Grid>
        </Grid>
        <GridList cellHeight="auto" cols={1}>
          <PostListItem {...post} CommentComp={SessioncontentCommentItem} />
        </GridList>
      </Grid>
    </GridListTile>
  )
}

SessioncontentGridItem.propTypes = {
  post: PropTypes.object.isRequired,
  state: PropTypes.string,
  programmed_at: PropTypes.number,
  script: PropTypes.number,
  onRepublish: PropTypes.func,
  onUnpublish: PropTypes.func
}

export default SessioncontentPublisher(SessioncontentGridItem)
