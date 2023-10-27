import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import ScriptSpeed from './ScriptSpeed.jsx'
import ScriptTime from './ScriptTime.jsx'

import Grid from '@material-ui/core/Grid'
import {
  getCurrentScriptAverageSeconds,
  getCurrentScriptElapsedTime,
  getCurrentScriptIdFieldByFieldname,
  getCurrentScriptRemainingTime,
  getCurrentScriptTotalTime
} from '../selectors.js'

import states from '../utils/stateConstants'
const MIN_UNPLANNED_TIME = 50

const ScriptTimes = ({ elapsedTime, totalTime, remainingTime, averageSeconds, state }) => {
  const warningClass = remainingTime <= MIN_UNPLANNED_TIME && state === states.PLAYING && totalTime < averageSeconds ? 'warning' : ''
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
  remainingTime: PropTypes.number,
  state: PropTypes.string,
  averageSeconds: PropTypes.number
}

const mapStateToProps = (state) => ({
  totalTime: getCurrentScriptTotalTime(state),
  elapsedTime: getCurrentScriptElapsedTime(state),
  remainingTime: getCurrentScriptRemainingTime(state),
  state: getCurrentScriptIdFieldByFieldname(state, {field: 'state'}),
  averageSeconds: getCurrentScriptAverageSeconds(state)

})

export default connect(mapStateToProps)(ScriptTimes)
