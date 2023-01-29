import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import ScriptSpeed from './ScriptSpeed.jsx'
import ScriptTime from './ScriptTime.jsx'

import Grid from '@material-ui/core/Grid'
import {
  getCurrentScriptElapsedTime,
  getCurrentScriptRemainingTime,
  getCurrentScriptTotalTime
} from '../selectors.js'
const MIN_UNPLANNED_TIME = 50

const ScriptTimes = ({ elapsedTime, totalTime, remainingTime }) => {
  const warningClass = remainingTime <= MIN_UNPLANNED_TIME ? 'warning' : ''
  return (
    <Grid item xs>
      <Grid container spacing={2}>
        <Grid item xs>
          <ScriptTime field="elapsed" value={elapsedTime} />
        </Grid>
        <Grid item xs>
          <ScriptTime
            field="total"
            value={totalTime}
            classname={warningClass}
          />
        </Grid>
        <Grid item xs>
          <ScriptTime
            field="remaining"
            value={remainingTime}
            classname={warningClass}
          />
        </Grid>
        <Grid item xs>
          <ScriptSpeed />
        </Grid>
      </Grid>
    </Grid>
  )
}

ScriptTimes.propTypes = {
  totalTime: PropTypes.number,
  elapsedTime: PropTypes.number,
  remainingTime: PropTypes.number
}

const mapStateToProps = (state) => ({
  totalTime: getCurrentScriptTotalTime(state),
  elapsedTime: getCurrentScriptElapsedTime(state),
  remainingTime: getCurrentScriptRemainingTime(state)
})

export default connect(mapStateToProps)(ScriptTimes)
