import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { startScript, pauseScript } from '../actions'
import useStyles from './styles'
import Button from '@material-ui/core/Button'

import WithSequenceManager from './HOC/SequencesManager.jsx'

const ScriptPlayer = ({ id, isPlaying, startScript, pauseScript, scriptsequences, connected }) => {
  const classes = useStyles()

  const onHandlePlayPause = () => {
    if (isPlaying) {
      pauseScript(id)
    } else {
      startScript(id)
    }
  }

  const onHandleRestart = () => {
    console.log('will restart script')
  }

  return (
    <>
      <Button 
        variant="contained" 
        className={classes.button}
        color='primary'
        disabled={ connected !== 'connected' }
        onClick={onHandlePlayPause}>
        { isPlaying ? 'pause' : 'play'}
      </Button>
      {(scriptsequences.length || '') && 
        <Button onClick={onHandleRestart}>restart</Button>
      }
    </>
  )
}

ScriptPlayer.propTypes = {
  id: PropTypes.number,
  connected: PropTypes.string,
  isPlaying: PropTypes.bool,
  startScript: PropTypes.func,
  pauseScript: PropTypes.func,
  scriptsequences: PropTypes.array
}

const mapDispatchToProps = (dispatch) => ({
  startScript: (id) => dispatch(startScript(id)),
  pauseScript: (id) => dispatch(pauseScript(id))
})

export default WithSequenceManager(connect(
  null,
  mapDispatchToProps
)(ScriptPlayer))
