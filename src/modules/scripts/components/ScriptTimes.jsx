import React from 'react'
import PropTypes from 'prop-types'
import ScriptSpeed from './ScriptSpeed.jsx'
import ScriptTime from './ScriptTime.jsx'

import Grid from '@material-ui/core/Grid'

const ScriptTimes = ({ script }) => {

  return (
    <Grid item xs>
      <Grid container spacing={2}>
        <Grid item xs>
          <ScriptTime field='elapsed' value={script.elapsedTime} />
        </Grid>
        <Grid item xs>
          <ScriptTime field='total' value={script.totalTime} />
        </Grid>
        <Grid item xs>
          <ScriptTime field='remaining' value={script.remainingTime} />
        </Grid>
        <Grid item xs>
          <ScriptSpeed {...script} />
        </Grid>
      </Grid>
    </Grid>
  )
}

ScriptTimes.propTypes = {
  script: PropTypes.object.isRequired
}

export default ScriptTimes

