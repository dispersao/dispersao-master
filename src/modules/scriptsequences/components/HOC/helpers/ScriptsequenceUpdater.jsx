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
  º,
  sequence,
  speed,
  updateProgress
}) => {
  const SEC_INTERVAL = 1000 / Number(speed)

  const { duration, sceneNumber } = sequence
  const [ticker, setTicker] = useState()

  const elapsedTimeRef = useRef(elapsedTime)
  elapsedTimeRef.current = elapsedTime

  const stateRef = useRef(0)

  

  const createRef = (vari) => {
    const ref = useRef(vari)
    ref.current = vari
    return ref
  }

  const stateVars = {
    initAt: {},
    pausedAt: {},
    lastTickAt: {},
    pausedCount: {},
    finishedAt: {}
  }

  Object.keys(stateVars).forEach(vari => {
    const [value, set] = useState(0)
    const ref = createRef(value)
    stateVars[vari] = {
      value,
      set,
      ref
    }
  })

  const {
    initAt,
    pausedAt,
    lastTickAt,
    pausedCount,
    finishedAt
  } = stateVars

  const updateTick = () => {
    const now = performance.now()
    const lasttickref = lastTickAt.ref.current || now
    const passedInterval = Math.round((now - lasttickref) / SEC_INTERVAL)
    // const passedFromInit =  Math.round((now - initAt.ref.current) / 1000)
    
    let elapsed = 0
    if (pausedAt.ref.current && lastTickAt.ref.current) {
      elapsed = pausedAt.ref.current - lastTickAt.ref.current
    }

    // console.log(`passedInterval: ${passedInterval}, 
    //   fromStart: ${(now - initAt.ref.current - pausedCount.ref.current) / 1000},
    //   elapsed: ${elapsed}, 
    //   lastTick: ${lastTickAt.ref.current}, 
    //   pausedAt:${pausedAt.ref.current},
    //   elapsedTime: ${elapsedTimeRef.current},
    //   passedFromInit: ${passedFromInit}`)

    let interval = SEC_INTERVAL - elapsed
    lastTickAt.set(() => now)

    clearTimeout(ticker)
    let tick = setTimeout(updateTick, interval)
    setTicker(tick)

    if (passedInterval) {
      updateProgress(id, Math.min(duration, Number(elapsedTimeRef.current) + passedInterval))
    }
  }

  const endTimeout = (clearLastTick = false) => {
    setTicker(t => {
      clearTimeout(t)
      return null
    })
    if (clearLastTick) {
      lastTickAt.set(() => 0)
    }
  }
 
  useEffect(() => {
    const now = performance.now()
    switch (state) {
      case "play":
        if (stateRef.current) {
          if (stateRef.current === 'idle' || stateRef.current == 'finished') {
            initAt.set(now)
            updateTick()
          } else if (stateRef.current === 'pause') {
            pausedCount.set(pausedCount.value + (now - pausedAt.value))
            updateTick()
            pausedAt.set(0)
          }
        }
        break

      case "pause":
        pausedAt.set(now)
        endTimeout(false)
        break

      case "finished":
        finishedAt.set(now)
        endTimeout(true)
        updateProgress(id, duration)

        console.log(`finished ${sceneNumber} after ${Math.round((now - initAt.value - pausedCount.value) / SEC_INTERVAL )}`)
        console.log(`finished ${sceneNumber} after ${now - initAt.value - pausedCount.value} miliseconds`)
        break
    }
    stateRef.current = state
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
    duration: PropTypes.number.isRequired,
    sceneNumber: PropTypes.string.isRequired
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
