import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import states from '../../utils/stateConstants'
import { createRandomScriptsequence } from '../../../scriptsequences/actions'

import {
  getCurrentScript,
  getCurrentScriptIdFieldByFieldname,
  getCurrentScriptRemainingTime,
  getCurrentScriptTotalTime
} from '../../selectors'
import { toJS } from '../../../../utils/immutableToJs.jsx'

const MIN_PLANNED_TIME = 120

const WithSequenceManager = (WrappedComponent) => {
  const SequenceManager = (props) => {
    const {
      script: {
        id,
        connected,
        state,
        speed = 1,
        scriptsequences,
        averagetime,
        manual
      },
      remainingTime,
      totalTime,
      createRandomScriptsequence,
      synching = false
    } = props

    const averageSeconds = parseInt(averagetime) * 60

    const [lastCreatedIndex, setLastCreatedIndex] = useState(null)

    useEffect(() => {
      if (
        !manual &&
        connected === 'connected' &&
        state !== states.IDLE &&
        !synching &&
        remainingTime < MIN_PLANNED_TIME &&
        totalTime < averageSeconds &&
        lastCreatedIndex !== scriptsequences.length
      ) {
        setLastCreatedIndex(scriptsequences.length)
        createRandomScriptsequence(id)
      }
    }, [manual, remainingTime, connected, totalTime, averageSeconds, state])

    const wrappedProps = {
      ...props
    }
    delete wrappedProps['createRandomScriptsequence']

    return <WrappedComponent {...wrappedProps} />
  }

  SequenceManager.propTypes = {
    remainingTime: PropTypes.number,
    totalTime: PropTypes.number,
    createRandomScriptsequence: PropTypes.func.isRequired,
    script: PropTypes.shape({
      id: PropTypes.number.isRequired,
      scriptsequences: PropTypes.array,
      connected: PropTypes.string,
      state: PropTypes.string,
      speed: PropTypes.string,
      averagetime: PropTypes.number
    })
  }

  const mapStateToProps = (state) => ({
    script: getCurrentScript(state),
    totalTime: getCurrentScriptTotalTime(state),
    remainingTime: getCurrentScriptRemainingTime(state),
    synching:
      getCurrentScriptIdFieldByFieldname(state, { field: 'synching' }) || false
  })

  const mapDispatchToProps = (dispatch) => ({
    createRandomScriptsequence: (id) =>
      dispatch(
        createRandomScriptsequence({
          script: id
        })
      )
  })

  return connect(mapStateToProps, mapDispatchToProps)(toJS(SequenceManager))
}

export default WithSequenceManager
