import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { playScript, pauseScript, setScriptManual } from '../actions'
import useStyles from './styles'
import Button from '@material-ui/core/Button'
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import states from '../utils/stateConstants'

import WithSequenceManager from './HOC/SequencesManager.jsx'
import WithAppContentManager from './HOC/AppContentManager.jsx'
import WithScriptManager from './HOC/ScriptManager.jsx'

const ScriptPlayer = ({
  id,
  state,
  speed,
  manual,
  startScript,
  pauseScript,
  connected,
  setScriptManual
}) => {
  const classes = useStyles()

  const onHandlePlayPause = () => {
    if (state === states.PLAYING) {
      pauseScript(id)
    } else if (state === states.PAUSED || state === states.STARTED) {
      startScript(id, parseInt(speed))
    }
  }

  const modifyManual= (event) => {
    setScriptManual(id, !event.target.checked)
  }

  const acceptedStates = [states.PLAYING, states.PAUSED, states.STARTED]
  const enabled = acceptedStates.includes(state) && connected

  return (
    <>
      {state !== states.FINISHED && (
        <Button
          variant="contained"
          className={classes.button}
          color="primary"
          disabled={!enabled}
          onClick={onHandlePlayPause}
        >
          {state === states.PLAYING ? 'pause' : 'play'}
        </Button>
      )}
      <FormControlLabel
        label="Automatic"
        control={<Checkbox checked={!manual} onChange={modifyManual}>Automatic</Checkbox>}
      />
    </>
  )
}

ScriptPlayer.propTypes = {
  id: PropTypes.number,
  connected: PropTypes.string,
  speed: PropTypes.string,
  startScript: PropTypes.func,
  pauseScript: PropTypes.func,
  scriptsequences: PropTypes.array,
  state: PropTypes.string,
  setScriptManual: PropTypes.func.isRequired
}

const mapDispatchToProps = (dispatch) => ({
  startScript: (id, speed) =>
    dispatch(
      playScript({
        id,
        speed
      })
    ),
  pauseScript: (id) => dispatch(pauseScript({ id })),
  setScriptManual: (id, manual) => dispatch(setScriptManual({ id, manual }))
})

export default WithScriptManager(
  WithAppContentManager(
    WithSequenceManager(connect(null, mapDispatchToProps)(ScriptPlayer))
  )
)
