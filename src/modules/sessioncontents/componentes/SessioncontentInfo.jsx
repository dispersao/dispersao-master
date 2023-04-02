import React from 'react'
import { toHHMMSS } from '../../../utils/stringUtils'
import { Typography, Grid } from '@material-ui/core'
import Republisher from './Republisher.jsx'
import LikesBox from './LikesBox.jsx'
import useStyles from './styles'

const SessioncontentInfo = React.memo(
  ({
    state,
    id,
    programmed_at,
    renderLikes = true,
    renderRepublish = true
  }) => {
    const allow_republish = ALLOW_REPUBLISH && renderRepublish
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
      <Grid
        item
        xs
        container
        direction="row"
        className={classes.sesconInfoContainer}
      >
        <Grid item xs>
          <Typography variant="body2" color={color}>
            {text}
          </Typography>
        </Grid>
        {(allow_republish && <Republisher id={id} state={state} />) || null}
        {(renderLikes && (
          <Grid item xs>
            <LikesBox id={id} />
          </Grid>
        )) ||
          null}
      </Grid>
    )
  }
)

export default SessioncontentInfo
