import React, { useEffect, useState, useRef } from 'react'

import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { updateScriptsequenceLocalState } from '../../../actions'
import {
  getScriptsequenceById,
  getScriptsequenceSequenceById
} from '../../../selectors'
import { getCurrentScriptIdFieldByFieldname } from '../../../../scripts/selectors'
import { toJS } from '../../../../../utils/immutableToJs.jsx'

const WithScriptsequenceTimer = (WrappedComponent) => {
  const ScriptsequenceTimer = (props) => {
    const { scriptsequence, sequence, speed, updateProgress } = props
    const SEC_INTERVAL = 1000 / Number(speed)
    let { id, state, index, elapsedTime = 0 } = scriptsequence
    state = state || 'idle'
    const { duration, sceneNumber } = sequence
    const [ticker, setTicker] = useState()

    const elapsedTimeRef = useRef(elapsedTime)
    elapsedTimeRef.current = elapsedTime

    const stateRef = useRef('idle')

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

    Object.keys(stateVars).forEach((vari) => {
      const [value, set] = useState(0)
      const ref = createRef(value)
      stateVars[vari] = {
        value,
        set,
        ref
      }
    })

    const { initAt, pausedAt, lastTickAt, pausedCount, finishedAt } = stateVars

    const updateTick = () => {
      const now = performance.now()
      const lasttickref = lastTickAt.ref.current || now
      const passedInterval = Math.round((now - lasttickref) / SEC_INTERVAL)

      let elapsed = 0
      if (pausedAt.ref.current && lastTickAt.ref.current) {
        elapsed = pausedAt.ref.current - lastTickAt.ref.current
      }

      let interval = SEC_INTERVAL - elapsed
      lastTickAt.set(() => now)

      clearTimeout(ticker)
      let tick = setTimeout(updateTick, interval)
      setTicker(tick)

      if (passedInterval) {
        updateProgress(
          id,
          Math.min(duration, Number(elapsedTimeRef.current) + passedInterval)
        )
      }
    }

    const endTimeout = (clearLastTick = false) => {
      setTicker((t) => {
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
        case 'play':
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

        case 'pause':
          pausedAt.set(now)
          endTimeout(false)
          break

        case 'finished':
          finishedAt.set(now)
          endTimeout(true)
          updateProgress(id, duration)

          console.log(
            `finished ${sceneNumber} after ${Math.round(
              (now - initAt.value - pausedCount.value) / SEC_INTERVAL
            )}`
          )
          console.log(
            `finished ${sceneNumber} after ${
              now - initAt.value - pausedCount.value
            } miliseconds`
          )
          break
      }
      stateRef.current = state
    }, [state])

    useEffect(() => {
      return (
      () => {
        endTimeout(true)
      })
    }, [])

    return <WrappedComponent {...scriptsequence} duration={duration} />
  }

  ScriptsequenceTimer.propTypes = {
    id: PropTypes.number.isRequired,
    scriptsequence: PropTypes.shape({
      state: PropTypes.string,
      elapsedTime: PropTypes.number
    }),
    sequence: PropTypes.shape({
      duration: PropTypes.number.isRequired,
      sceneNumber: PropTypes.string.isRequired
    }).isRequired,
    speed: PropTypes.string.isRequired,
    updateProgress: PropTypes.func.isRequired
  }

  const mapStateToProps = (state, ownProps) => ({
    sequence: getScriptsequenceSequenceById(state, ownProps),
    scriptsequence: getScriptsequenceById(state, ownProps),
    speed: getCurrentScriptIdFieldByFieldname(state, { field: 'speed' })
  })

  const mapDispatchtoProps = (dispatch) => ({
    updateProgress: (id, elapsedTime) => {
      dispatch(
        updateScriptsequenceLocalState({
          id,
          elapsedTime
        })
      )
    }
  })

  return connect(mapStateToProps, mapDispatchtoProps)(toJS(ScriptsequenceTimer))
}

export default WithScriptsequenceTimer
