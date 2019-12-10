import React from 'react'
// import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import ScriptName from './ScriptName.jsx'
import ScriptAveragetime from './ScriptAveragetime.jsx'


// import { toJS } from '../../../utils/immutableToJs'

import Grid from '@material-ui/core/Grid'

const ScriptHeader = ({ name, averagetime, id, synching }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs>
        <ScriptName 
          name={name} 
          id={id} 
          synching={synching} 
          field="name" />
      </Grid>
      <Grid item>
        <ScriptAveragetime 
          id={id} 
          synching={synching} 
          averagetime={averagetime} 
          field="averagetime" />
      </Grid>
    </Grid>
  )
}

ScriptHeader.propTypes = {
  name: PropTypes.string.isRequired,
  averagetime: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  synching: PropTypes.bool
}

export default ScriptHeader
