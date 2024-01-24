import React from 'react'
import ScriptPlayer from './ScriptPlayer.jsx'
import ScriptStarter from './ScriptStarter.jsx'
import ScriptConnecter from './ScriptConnecter.jsx'
import ScriptTimes from './ScriptTimes.jsx'

import Grid from '@material-ui/core/Grid'
import useStyles from './styles/index.js'

const ScriptActions = () => {
  const classes = useStyles()
  return (
    <Grid container spacing={3}>
      <ScriptTimes />
      <Grid item xs className={classes.connecterContainer}>
        <ScriptStarter />
        <ScriptPlayer />
        <ScriptConnecter />
      </Grid>
    </Grid>
  )
}

export default ScriptActions
