import React from 'react'
// import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import ScriptName from './ScriptName.jsx'
import ScriptAveragetime from './ScriptAveragetime.jsx'


import Grid from '@material-ui/core/Grid'

const ScriptHeader = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs>
        <ScriptName />
      </Grid>
      <Grid item>
        <ScriptAveragetime />
      </Grid>
    </Grid>
  )
}

export default ScriptHeader
