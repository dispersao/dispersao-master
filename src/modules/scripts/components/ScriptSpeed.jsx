import React from 'react'
import PropTypes from 'prop-types'
import Speed from './Speed.jsx'
import ScriptFieldUpdateComp from './HOC/ScriptFieldDisplayer.jsx'

import states from '../utils/stateConstants'


const ScriptSpeed = ({ save, speed, state }) => {
  return (
    <Speed onSelect={save} value={speed} disabled={state === states.PLAYING}  />
  )
}

ScriptSpeed.propTypes = {
  value: PropTypes.string,
  save: PropTypes.func,
  speed: PropTypes.string,
  state: PropTypes.string
  // isPlaying: PropTypes.bool
}

export default ScriptFieldUpdateComp(ScriptSpeed, 'speed', false)
