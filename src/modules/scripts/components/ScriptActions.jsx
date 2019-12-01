import React from 'react'
import ScriptPlayer from './ScriptPlayer.jsx'
// import ScriptAveragetime from './ScriptAveragetime.jsx'
// import ScriptSpeed from './ScriptSpeed.jsx'
import ScriptConnecter from './ScriptConnecter.jsx'
import ScriptTimes from './ScriptTimes.jsx'

import Grid from '@material-ui/core/Grid'

const ScriptActions = (script) => {
  return (
    <Grid container spacing={3}>
      <Grid item xs>
        <ScriptConnecter {...script} />
        <ScriptPlayer {...script} />
      </Grid>
      <ScriptTimes script={script} />
      
    </Grid>
  )
}

export default ScriptActions
