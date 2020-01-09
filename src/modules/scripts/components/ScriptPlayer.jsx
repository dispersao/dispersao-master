import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { playScript, pauseScript } from '../actions'
import useStyles from './styles'
import Button from '@material-ui/core/Button'

import states from '../utils/stateConstants'

import WithSequenceManager from './HOC/SequencesManager.jsx'
import WithAppContentManager from './HOC/AppContentManager.jsx'

const ScriptPlayer = ({ id, state, speed, startScript, pauseScript, scriptsequences, connected }) => {
  const classes = useStyles()

  const onHandlePlayPause = () => {
    if (state === states.PLAYING) {
      pauseScript(id)
    } else if (state === states.PAUSED || state === states.STARTED) {
      startScript(id, parseInt(speed))
    }
  }

  const acceptedStates = [
    states.PLAYING, 
    states.PAUSED,
    states.STARTED
  ]
  const enabled = acceptedStates.includes(state) && connected

  return (
    <>
      <Button 
        variant="contained" 
        className={classes.button}
        color='primary'
        disabled={ !enabled }
        onClick={onHandlePlayPause}>
        { state === states.PLAYING ? 'pause' : 'play'}
      </Button>
      {/* {(scriptsequences.length || '') && 
        <Button onClick={onHandleRestart}>restart</Button>
      } */}
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
  state: PropTypes.string
}

const mapDispatchToProps = (dispatch) => ({
  startScript: (id, speed) => dispatch(playScript({
    id,
    speed
  })),
  pauseScript: (id) => dispatch(pauseScript({ id }))
})

export default WithAppContentManager(
  WithSequenceManager(
    connect(
      null,
      mapDispatchToProps
    )(ScriptPlayer)
  )
)
