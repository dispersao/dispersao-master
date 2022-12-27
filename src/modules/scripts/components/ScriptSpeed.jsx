import React from 'react'
import PropTypes from 'prop-types'
import Speed from './Speed.jsx'
import ScriptFieldUpdateComp from './HOC/ScriptFieldDisplayer.jsx'

import states from '../utils/stateConstants'


const ScriptSpeed = ({ save, val, state }) => {
  return (
    <Speed onSelect={save} value={val} disabled={state === states.PLAYING}  />
  )
}

ScriptSpeed.propTypes = {
  save: PropTypes.func,
  val: PropTypes.string,
  state: PropTypes.string
}

export default ScriptFieldUpdateComp(ScriptSpeed, 'speed', false, ['state'])
