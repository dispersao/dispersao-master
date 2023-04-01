import { Grid, Typography } from '@material-ui/core'
import GroupIcon from '@material-ui/icons/Group'
import TouchAppIcon from '@material-ui/icons/TouchApp'
import ThumbsUpDownIcon from '@material-ui/icons/ThumbsUpDown'
import React from 'react'
import { getCurrentScriptIdFieldByFieldname } from '../../scripts/selectors'
import { connect } from 'react-redux'
import {
  getCurrentscriptLikesUniqueUsersCount,
  getCurrentScriptTotalLikes
} from '../../likes/selectors'

import useStyles from './styles'

const SessioncontentStats = React.memo(({ users, activeusers, totallikes }) => {
 const classes = useStyles()
  return (
    <Grid container className={classes.sessioncontentStatsContainer}>
      <Grid item xs className={classes.statsContainer}>
        <GroupIcon className={classes.statsIcon}/>
        <Typography variant="body2">{users}</Typography>
      </Grid>
      <Grid item xs className={classes.statsContainer}>
        <TouchAppIcon className={classes.statsIcon}/>
        <Typography variant="body2">{activeusers}</Typography>
      </Grid>
      <Grid item xs className={classes.statsContainer}>
        <ThumbsUpDownIcon className={classes.statsIcon}/>
        <Typography variant="body2">{totallikes}</Typography>
      </Grid>
    </Grid>
  )
})

const mapStateToProps = (state) => ({
  users: getCurrentScriptIdFieldByFieldname(state, { field: 'appusers' }),
  activeusers: getCurrentscriptLikesUniqueUsersCount(state),
  totallikes: getCurrentScriptTotalLikes(state)
})

export default connect(mapStateToProps)(SessioncontentStats)
