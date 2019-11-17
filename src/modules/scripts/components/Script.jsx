import React from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { toJS } from '../../../utils/immutableToJs.jsx'
import { getScriptById } from '../selectors.js'

import { Redirect } from 'react-router-dom'
import UnplayedSequences from '../../sequences/components/UnplayedSequences.jsx'
import ScriptHeader from './ScriptHeader.jsx'
import ScriptActions from './ScriptActions.jsx'

import Divider from '@material-ui/core/Divider'

const Script = ({ script }) => {
  if (!script) {
    return <Redirect to='/scripts' />
  }

  const { id } = script
  // const { id, name, averagetime, speed, synching } = script
  return (
    
    <div>
      <ScriptHeader {...script} />
      <Divider />
      <UnplayedSequences script={id} scriptsequences={script.scriptsequences} />
      <Divider />
      <ScriptActions {...script} />
    </div>
  )
}

Script.propTypes = {
  script: PropTypes.object
}

const mapStateToProps = (state, { match }) => {
  const { id } = match.params
  let script = {}
  if (id ) {
    script = getScriptById(state, { id })
  }
  return {
    script
  }
}

export default connect(
  mapStateToProps,
  null
)(toJS(Script))
