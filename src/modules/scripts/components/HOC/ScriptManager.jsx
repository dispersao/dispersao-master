import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import states from '../../utils/stateConstants'
import { finishScript } from '../../actions'


const WithScriptManager = WrappedComponent => {

  const ScriptManager = (props) => {
    const { 
      id,
      elapsedTime,
      totalTime,
      state,
      scriptsequences,
      endScript
    } = props


    const lastScriptSequences = scriptsequences.find(({ isLast }) => isLast)
    const isLastScriptSequenceOver = lastScriptSequences?.state === 'finished'

    useEffect(() => {
      if (isLastScriptSequenceOver) {
        if (elapsedTime >= totalTime && state !== states.FINISHED) {
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
    id: PropTypes.number.isRequired,
    scriptsequences: PropTypes.array,
    elapsedTime: PropTypes.number,
    totalTime: PropTypes.number,
    endScript: PropTypes.func.isRequired,
    state: PropTypes.string,
  }
  
  const mapDispatchToProps = (dispatch) => ({
    endScript: (id) => dispatch(finishScript({
      id: id
    }))
  })
  
  return connect(
    null,
    mapDispatchToProps
  )(ScriptManager)
}

export default WithScriptManager
