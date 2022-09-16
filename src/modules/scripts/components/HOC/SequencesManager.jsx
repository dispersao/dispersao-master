import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import states from '../../utils/stateConstants'
import { createRandomScriptsequence } from '../../../scriptsequences/actions'

import ScriptsequenceUpdate from '../../../scriptsequences/components/HOC/helpers/ScriptsequenceUpdater.jsx'

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
      state,
      speed,
      scriptsequences,
      manual
    } = props

    const [lastCreatedIndex, setLastCreatedIndex] = useState(null)

    useEffect(() => {
      if (!manual && connected === 'connected' && 
          state !== states.IDLE && 
          remainingTime < MIN_PLANNED_TIME && 
          totalTime < averageSeconds && 
          lastCreatedIndex !== scriptsequences.length) {
        setLastCreatedIndex(scriptsequences.length)
        createRandomScriptsequence(id)
      }
    }, [manual, remainingTime, connected, totalTime, averageSeconds, state])

    const wrappedProps = {
      ...props
    }
    delete wrappedProps['createRandomScriptsequence']
    
    const scriptsequencesProgressManagers = scriptsequences.map((scrseq, key) => {
      return <ScriptsequenceUpdate 
        key={key}
        speed={speed}
        {...scrseq} />
    })

    return (
      <>
        {scriptsequencesProgressManagers}
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
    state: PropTypes.string,
    speed: PropTypes.string.isRequired
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
