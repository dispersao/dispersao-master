import React, { 
  useEffect, 
  useState, 
  useRef 
} from 'react'

import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import {
  updateScriptsequenceLocalState
} from '../../../actions'

const ScriptsequenceTimer = ({
  id,
  state,
  elapsedTime,
  sequence,
  speed,
  updateProgress
}) => {
  const SEC_INTERVAL = 1000 / Number(speed)

  const { duration } = sequence
  const [ticker, setTicker] = useState()
  const [progression, setProgression] = useState(elapsedTime)
  const [lastTickAt, setLastTickAt] = useState(0)
  const [elapsed, setElapsed] = useState(0)
  const [initedAt, setInitedAt] = useState(0)

  const initedAtRef = useRef(initedAt)
  initedAtRef.current = initedAt

  const elapsedTimeRef = useRef(elapsedTime)
  elapsedTimeRef.current = elapsedTime

  const updateTick = () => {
    setLastTickAt(performance.now())
    const passed = Math.round((performance.now() - initedAtRef.current) / 1000)
    setProgression(p => {
      const scriptSeconds = Math.min(duration, p + 1)
      console.log('passed', passed, 'scriptSeconds', scriptSeconds)
      updateProgress(id, scriptSeconds)
      return scriptSeconds
    })
    clearTimeout(ticker)
    let tick = setTimeout(updateTick, SEC_INTERVAL)
    setTicker(tick)
  }

  const endTimeout = () => {
    setTicker(t => {
      clearTimeout(t)
      return null
    })
  }
 
  useEffect(() => {
    if (state === 'play') {
      const n = performance.now()
      setInitedAt(() => n)
      endTimeout()
      setLastTickAt(n)
      const interval = SEC_INTERVAL - elapsed
      clearTimeout(ticker)
      const tick = setTimeout(updateTick, interval)
      setTicker(tick)
      setElapsed(0)
    } else if (state === 'pause') {
      setElapsed(performance.now() - lastTickAt)
      endTimeout()
    } else if (state === 'finished') {
      if (progression !== duration) {
        const passed = Math.round((performance.now() - initedAt) / 1000)
        console.log('finished at elapsed', progression, 'with duration of: ', duration, 'passed: ', passed)
        setProgression(duration)
      }
      endTimeout()
    }
    return endTimeout
  }, [state])

  return (
    <>
      {React.children}
    </>
  )
}

ScriptsequenceTimer.propTypes = {
  id: PropTypes.number.isRequired,
  state: PropTypes.string.isRequired,
  elapsedTime: PropTypes.number.isRequired,
  sequence: PropTypes.shape({
    duration: PropTypes.number.isRequired
  }),
  speed: PropTypes.string.isRequired,
  updateProgress: PropTypes.func.isRequired
}

const mapDispatchtoProps = (dispatch) => ({
  updateProgress: (id, elapsedTime) => dispatch(updateScriptsequenceLocalState({
    id,
    elapsedTime
  }))
})

export default connect(
  null,
  mapDispatchtoProps
)(ScriptsequenceTimer)
