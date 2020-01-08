import React from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { toJS } from '../../../utils/immutableToJs.jsx'
import { getScriptById } from '../selectors.js'

import { Redirect } from 'react-router-dom'
import ScriptHeader from './ScriptHeader.jsx'
import ScriptActions from './ScriptActions.jsx'
import ScriptTabs from './ScriptTabs.jsx'

import Divider from '@material-ui/core/Divider'

const Script = ({ script }) => {
  if (!script) {
    return <Redirect to='/scripts' />
  }

  return (
    <div>
      <ScriptHeader {...script} />
      <Divider />
      <ScriptActions {...script} />
      <ScriptTabs script={script}/>
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
