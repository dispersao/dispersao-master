import React from 'react'
import PropTypes from 'prop-types'
import Speed from './Speed.jsx'
import ScriptFieldUpdateComp from './HOC/ScriptFieldDisplayer.jsx'


const ScriptSpeed = ({ save, speed }) => {
  return (
    <Speed onSelect={save} value={speed}  />
  )
}

ScriptSpeed.propTypes = {
  value: PropTypes.string,
  save: PropTypes.func,
  speed: PropTypes.string
}

export default ScriptFieldUpdateComp(ScriptSpeed, 'speed')
