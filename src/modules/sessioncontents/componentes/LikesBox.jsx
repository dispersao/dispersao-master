import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Grid, Typography } from '@material-ui/core'
import { ThumbDown, ThumbUp } from '@material-ui/icons'
import RecentActorsIcon from '@material-ui/icons/RecentActors'

import useStyles from './styles/'
import {
  getDislikesCountBySessioncontentId,
  getLikesCountBySessioncontentId
} from '../../likes/selectors'
import { getCurrentScriptIdFieldByFieldname } from '../../scripts/selectors'

const LikesBox = React.memo(({ likes, dislikes, totalUsers }) => {
  const classes = useStyles()

  return (
    <Grid item container xs className={classes.likesBox}>
      <Grid
        item
        className={[classes.likeIconContainer, likes ? '' : 'disabled']
          .filter(Boolean)
          .join(' ')}
      >
        <ThumbUp className={classes.likeIcon} />
        <Typography variant="body2">{likes}</Typography>
      </Grid>
      <Grid
        item
        className={[classes.likeIconContainer, dislikes ? '' : 'disabled']
          .filter(Boolean)
          .join(' ')}
      >
        <ThumbDown className={classes.likeIcon} />
        <Typography variant="body2">{dislikes}</Typography>
      </Grid>
      <Grid item className={classes.likeIconContainer}>
        <RecentActorsIcon className={classes.likeIcon} />
        <Typography variant="body2">
          {Math.round(((likes + dislikes) / totalUsers) * 100)}%
        </Typography>
      </Grid>
    </Grid>
  )
})

LikesBox.propTypes = {
  likes: PropTypes.number,
  dislikes: PropTypes.number,
  totalUsers: PropTypes.number
}

const mapStateToProps = (state, ownProps) => ({
  likes: getLikesCountBySessioncontentId(state, ownProps),
  dislikes: getDislikesCountBySessioncontentId(state, ownProps),
  totalUsers: getCurrentScriptIdFieldByFieldname(state, { field: 'appusers' })
})
export default connect(mapStateToProps)(LikesBox)
