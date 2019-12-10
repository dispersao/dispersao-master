import React from 'react'
import PropTypes from 'prop-types'
import Speed from './Speed.jsx'
import ScriptFieldUpdateComp from './HOC/ScriptFieldDisplayer.jsx'


const ScriptSpeed = ({ save, speed, isPlaying }) => {
  return (
    <Speed onSelect={save} value={speed} disabled={isPlaying}  />
  )
}

ScriptSpeed.propTypes = {
  value: PropTypes.string,
  save: PropTypes.func,
  speed: PropTypes.string,
  isPlaying: PropTypes.bool
}

export default ScriptFieldUpdateComp(ScriptSpeed, 'speed', false)
