import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { startSession, resetSession } from '../actions'
import useStyles from './styles'
import { 
  Typography, 
  Button 
} from '@material-ui/core'
import states from '../utils/stateConstants'


const ScriptPlayer = ({ 
  id, 
  token, 
  state, 
  connected, 
  scriptsequences,
  initSession, 
  reinitSession
}) => {
  const classes = useStyles()

  const onHandleStart = () => {
    if (state === 'idle') {
      initSession(id, token)
    }
  }

  const onHandleReset = () => {
    reinitSession(id)
  }

  const enabled = state === states.IDLE && connected

  return (
    <>
      {state === states.IDLE && 
        <Button 
          variant="contained" 
          className={classes.button}
          color='primary'
          disabled={ !enabled }
          onClick={onHandleStart}>
          start session
        </Button>
      }
      {state === states.STARTED && 
        <Typography 
          className={classes.startedText}>
          {token}
        </Typography>
      }
      { (state === states.IDLE && scriptsequences.length || state === states.STARTED || state === states.PAUSED) && connected &&
        <Button 
          variant="contained" 
          className={classes.button}
          color='secondary'
          onClick={onHandleReset}>
          reset Session
        </Button>
      }
      
      
      
      {/* {(scriptsequences.length || '') && 
        <Button onClick={onHandleRestart}>restart</Button>
      } */}
    </>
  )
}

ScriptPlayer.propTypes = {
  id: PropTypes.number,
  connected: PropTypes.string,
  state: PropTypes.string,
  initSession: PropTypes.func,
  reinitSession: PropTypes.func,
  token: PropTypes.string,
  scriptsequences: PropTypes.array
}

const mapDispatchToProps = (dispatch) => ({
  initSession: (id, token) => dispatch(startSession({
    id,
    token,
  })),
  reinitSession: (id) => dispatch(resetSession({
    id
  }))
})

export default connect(
  null,
  mapDispatchToProps
)(ScriptPlayer)
