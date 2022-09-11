import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import states from '../../utils/stateConstants'
import { createRandomScriptsequence } from '../../../scriptsequences/actions'

import ScriptsequenceUpdate from '../../../scriptsequences/components/HOC/helpers/ScriptsequenceUpdater.jsx'
import { stopPollAppdata, pollAppdata } from '../../actions'

const MIN_PLANNED_TIME = 120
const APP_INFO_MARGIN = 20
const APP_DATA_FETCH = 5 * 1000

const WithSequenceManager = (WrappedComponent) => {
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
      appdata,
      startPollingAppdata,
      stopPollingAppdata
    } = props

    const [lastCreatedIndex, setLastCreatedIndex] = useState(null)

    useEffect(() => {
      if (
        connected === 'connected' &&
        state !== states.IDLE &&
        remainingTime < MIN_PLANNED_TIME &&
        totalTime < averageSeconds &&
        lastCreatedIndex !== scriptsequences.length
      ) {
        setLastCreatedIndex(scriptsequences.length)
        createRandomScriptsequence(id)
      }
    }, [remainingTime, connected, totalTime, averageSeconds, state, appdata])

    useEffect(() => {
      if (
        connected === 'connected' &&
        state !== states.IDLE &&
        state !== states.FINISHED
      ) {
        console.log('starting to poll appdata', appdata)
        startPollingAppdata(id)
      } else {
        stopPollingAppdata()
      }
    }, [connected, state])

    const wrappedProps = {
      ...props
    }
    delete wrappedProps['createRandomScriptsequence']

    const scriptsequencesProgressManagers = scriptsequences.map(
      (scrseq, key) => {
        return <ScriptsequenceUpdate key={key} speed={speed} {...scrseq} />
      }
    )

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
    startPollingAppdata: PropTypes.func.isRequired,
    stopPollingAppdata: PropTypes.func.isRequired,
    connected: PropTypes.string,
    state: PropTypes.string,
    speed: PropTypes.string.isRequired
  }

  const mapDispatchToProps = (dispatch) => ({
    createRandomScriptsequence: (id) =>
      dispatch(
        createRandomScriptsequence({
          script: id
        })
      ),
    startPollingAppdata: (id) => dispatch(pollAppdata(id)),
    stopPollingAppdata: () => dispatch(stopPollAppdata())
  })

  return connect(null, mapDispatchToProps)(SequenceManager)
}

export default WithSequenceManager
