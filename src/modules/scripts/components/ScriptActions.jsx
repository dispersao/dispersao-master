import React from 'react'
import ScriptPlayer from './ScriptPlayer.jsx'
import ScriptAveragetime from './ScriptAveragetime.jsx'
import ScriptSpeed from './ScriptSpeed.jsx'
import ScriptConnecter from './ScriptConnecter.jsx'

import Grid from '@material-ui/core/Grid'

const ScriptActions = (script) => {
  return (
    <Grid container spacing={3}>
      <Grid item xs>
        <ScriptConnecter {...script} />
        <ScriptPlayer {...script} />
      </Grid>
      <Grid item xs>
        <Grid container spacing={2}>
          <Grid item xs>
            <ScriptAveragetime {...script} field="averagetime" />
          </Grid>
          <Grid item xs>
            <ScriptSpeed {...script} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default ScriptActions
