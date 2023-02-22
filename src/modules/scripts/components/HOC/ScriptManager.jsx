import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import states from '../../utils/stateConstants'
import { finishScript } from '../../actions'
import {
  getCurrentScript,
  getCurrentScriptElapsedTime,
  getCurrentSCriptLastScriptsequence,
  getCurrentScriptTotalTime
} from '../../selectors'
import { toJS } from '../../../../utils/immutableToJs.jsx'

const WithScriptManager = (WrappedComponent) => {
  const ScriptManager = (props) => {
    const {
      script: { id, state, manual },
      lastScriptSequence,
      elapsedTime,
      totalTime,
      endScript
    } = props

    const isLastScriptSequenceOver = lastScriptSequence?.state === 'finished'

    useEffect(() => {
      if (isLastScriptSequenceOver) {
        if ((manual || elapsedTime >= totalTime) && state !== states.FINISHED) {
          endScript(id)
        }
      }
    }, [isLastScriptSequenceOver, totalTime, elapsedTime, state])

    const wrappedProps = {
      ...props
    }

    return <WrappedComponent {...wrappedProps} />
  }

  ScriptManager.propTypes = {
    script: PropTypes.shape({
      id: PropTypes.number.isRequired,
      state: PropTypes.string,
      manual: PropTypes.bool
    }),
    elapsedTime: PropTypes.number,
    totalTime: PropTypes.number,
    endScript: PropTypes.func.isRequired
  }

  const mapStateToProps = (state) => ({
    script: getCurrentScript(state),
    elapsedTime: getCurrentScriptElapsedTime(state),
    totalTime: getCurrentScriptTotalTime(state),
    lastScriptSequence: getCurrentSCriptLastScriptsequence(state)
  })

  const mapDispatchToProps = (dispatch) => ({
    endScript: (id) =>
      dispatch(
        finishScript({
          id: id
        })
      )
  })

  return connect(mapStateToProps, mapDispatchToProps)(toJS(ScriptManager))
}

export default WithScriptManager
