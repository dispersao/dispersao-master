import React from 'react'
// import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import ScriptName from './ScriptName.jsx'
import ScriptAveragetime from './ScriptAveragetime.jsx'


// import { toJS } from '../../../utils/immutableToJs'

const ScriptHeader = ({ name, averagetime, id, synching }) => {
  return (
    <div>
      <ScriptName name={name} id={id} synching={synching} />
      <ScriptAveragetime id={id} synching={synching} averagetime={averagetime} />
    </div>
  )
}

ScriptHeader.propTypes = {
  name: PropTypes.string.isRequired,
  averagetime: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  synching: PropTypes.bool
}

export default ScriptHeader
