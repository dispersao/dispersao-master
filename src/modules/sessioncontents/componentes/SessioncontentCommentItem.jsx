import React from 'react'
import PropTypes from 'prop-types'

import { Publish, Refresh, Delete } from '@material-ui/icons'

import CommentListItem from '../../comments/components/CommentListItem.jsx'

import SessioncontentPublisher from './HOC/SessioncontentPublisher.jsx'

import { toHHMMSS } from '../../../utils/stringUtils'
import useStyles from './styles/'

import {
  GridListTile,
  GridList,
  Typography,
  Grid,
  IconButton
} from '@material-ui/core'

const SessioncontentCommentItem = ({
  comment,
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
          <CommentListItem {...comment} />
        </GridList>
      </Grid>
    </GridListTile>
  )
}

SessioncontentCommentItem.propTypes = {
  comment: PropTypes.object,
  state: PropTypes.string,
  programmed_at: PropTypes.number,
  onRepublish: PropTypes.func,
  onUnpublish: PropTypes.func
}

export default SessioncontentPublisher(SessioncontentCommentItem)
