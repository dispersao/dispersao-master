import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { createRandomScriptsequence } from '../../../scriptsequences/actions'

const MIN_PLANNED_TIME = 120

const WithSequenceManager = WrappedComponent => {

  const SequenceManager = (props) => {
    const { 
      id, 
      scriptsequences, 
      remainingTime,
      totalTime,
      averageSeconds,
      createRandomScriptsequence, 
      connected
    } = props

    useEffect(() => {
      if (connected === 'connected' && remainingTime < MIN_PLANNED_TIME && totalTime < averageSeconds) {
        createRandomScriptsequence(id, scriptsequences.length)
      }
    }, [remainingTime, connected, totalTime, averageSeconds])

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
    connected:PropTypes.string
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
