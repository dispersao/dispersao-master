import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { startSession, resetSession } from '../actions'
import useStyles from './styles'
import { Typography, Button } from '@material-ui/core'
import states from '../utils/stateConstants'
import { getCurrentScript } from '../selectors'
import { toJS } from '../../../utils/immutableToJs.jsx'
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';

const ScriptStarter = ({
  script: {
    id,
    state,
    connected,
    scriptsequences,
  },
  initSession,
  reinitSession
}) => {
  const classes = useStyles()

  const onHandleStart = () => {
    if (state === 'idle') {
      initSession(id)
    }
  }

  const onHandleReset = () => {
    reinitSession(id)
  }

  const enabled = state === states.IDLE && connected

  const resetAcceptedValues = [states.PAUSED, states.STARTED, states.FINISHED]

  return (
    <>
      {state === states.IDLE && (
        <Button
          variant="contained"
          className={classes.button}
          color="primary"
          disabled={!enabled}
          onClick={onHandleStart}
        >
          <ArrowUpwardIcon />
        </Button>
      )}
      
      {(resetAcceptedValues.includes(state) ||
        (state === states.IDLE && (scriptsequences.length || ''))) &&
        connected && (
          <Button
            variant="contained"
            className={classes.button}
            color="secondary"
            onClick={onHandleReset}
          >
            <RotateLeftIcon />
          </Button>
        )}
    </>
  )
}

ScriptStarter.propTypes = {
  initSession: PropTypes.func,
  reinitSession: PropTypes.func,
  script: PropTypes.shape({
    id: PropTypes.number,
    connected: PropTypes.string,
    state: PropTypes.string,
    token: PropTypes.string,
    scriptsequences: PropTypes.array
  })
}

const mapStateToProps = (state) => ({
  script: getCurrentScript(state)
})

const mapDispatchToProps = (dispatch) => ({
  initSession: (id) =>
    dispatch(
      startSession({
        id
      })
    ),
  reinitSession: (id) =>
    dispatch(
      resetSession({
        id
      })
    )
})

export default connect(mapStateToProps, mapDispatchToProps)(toJS(ScriptStarter))
