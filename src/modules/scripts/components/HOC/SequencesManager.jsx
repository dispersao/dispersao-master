import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import states from '../../utils/stateConstants'
import { createRandomScriptsequence } from '../../../scriptsequences/actions'

const MIN_PLANNED_TIME = 120

const WithSequenceManager = WrappedComponent => {

  const SequenceManager = (props) => {
    const { 
      id, 
      remainingTime,
      totalTime,
      averageSeconds,
      createRandomScriptsequence, 
      connected,
      state
    } = props

    useEffect(() => {
      if (connected === 'connected' && state !== states.IDLE && remainingTime < MIN_PLANNED_TIME && totalTime < averageSeconds) {
        createRandomScriptsequence(id)
      }
    }, [remainingTime, connected, totalTime, averageSeconds, state])

    const wrappedProps = {
      ...props
    }
    delete wrappedProps['createRandomScriptsequence']
    
    return (
      <>
        <WrappedComponent {...wrappedProps} />
      </>
    )
  }
  
  SequenceManager.propTypes = {
    id: PropTypes.number.isRequired,
    scriptsequences: PropTypes.array,
    remainingTime: PropTypes.number,
    totalTime: PropTypes.number,
    averageSeconds: PropTypes.number,
    createRandomScriptsequence: PropTypes.func.isRequired,
    connected:PropTypes.string,
    state: PropTypes.string
  }
  
  const mapDispatchToProps = (dispatch) => ({
    createRandomScriptsequence: (id) => dispatch(createRandomScriptsequence({
      script: id
    }))
  })
  
  return connect(
    null,
    mapDispatchToProps
  )(SequenceManager)
}

export default WithSequenceManager
