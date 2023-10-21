import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import states from '../../utils/stateConstants'
import { createRandomScriptsequence } from '../../../scriptsequences/actions'

import { getCurrentScript, getCurrentScriptRemainingTime, getCurrentScriptTotalTime } from '../../selectors'
import { toJS } from '../../../../utils/immutableToJs.jsx'
import { getCurrentScriptCreditsScriptsequenceByPosition } from '../../../scriptsequences/selectors'

const MIN_PLANNED_TIME = 120

const WithSequenceManager = WrappedComponent => {

  const SequenceManager = (props) => {
    const {
      script: {
        id, 
        connected,
        state,
        scriptsequences,
        averagetime,
        manual
      },
      remainingTime,
      totalTime,
      createRandomScriptsequence,
      closingCreditsScriptsequence
    } = props

    const averageSeconds = parseInt(averagetime) * 60

    const [lastCreatedIndex, setLastCreatedIndex] = useState(null)

    useEffect(() => {
      if (!manual && connected === 'connected' && 
          state !== states.IDLE && 
          remainingTime < MIN_PLANNED_TIME && 
          (totalTime < averageSeconds || !closingCreditsScriptsequence) && 
          lastCreatedIndex !== scriptsequences.length) {
        setLastCreatedIndex(scriptsequences.length)
        createRandomScriptsequence(id)
      }
    }, [manual, remainingTime, connected, totalTime, averageSeconds, state])

    const wrappedProps = {
      ...props
    }
    delete wrappedProps['createRandomScriptsequence']
    
   

    return (
      <WrappedComponent {...wrappedProps} />
    )
  }
  
  SequenceManager.propTypes = {
    remainingTime: PropTypes.number,
    totalTime: PropTypes.number,
    createRandomScriptsequence: PropTypes.func.isRequired,
    closingCreditsScriptsequence: PropTypes.object,
    script: PropTypes.shape({
      id: PropTypes.number.isRequired,
      scriptsequences: PropTypes.array,
      connected:PropTypes.string,
      state: PropTypes.string,
      speed: PropTypes.string,
      averagetime: PropTypes.number
    })
  }

  const mapStateToProps = (state) => ({
    script: getCurrentScript(state),
    totalTime: getCurrentScriptTotalTime(state),
    remainingTime: getCurrentScriptRemainingTime(state),
    closingCreditsScriptsequence: getCurrentScriptCreditsScriptsequenceByPosition(state, {creditsPosition: 'closing'})
  })
  
  const mapDispatchToProps = (dispatch) => ({
    createRandomScriptsequence: (id) => dispatch(createRandomScriptsequence({
      script: id
    }))
  })
  
  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(toJS(SequenceManager))
}

export default WithSequenceManager
