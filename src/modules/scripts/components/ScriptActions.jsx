import React from 'react'
import ScriptPlayer from './ScriptPlayer.jsx'
import ScriptStarter from './ScriptStarter.jsx'
import ScriptConnecter from './ScriptConnecter.jsx'
import ScriptTimes from './ScriptTimes.jsx'

import Grid from '@material-ui/core/Grid'

const ScriptActions = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs>
        <ScriptConnecter />
        <ScriptStarter />
        <ScriptPlayer />
      </Grid>
      <ScriptTimes />
    </Grid>
  )
}

export default ScriptActions
