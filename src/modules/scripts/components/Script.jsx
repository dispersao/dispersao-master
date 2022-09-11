import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { toJS } from '../../../utils/immutableToJs.jsx'
import { getScriptById, getCurrentScript } from '../selectors.js'

import { Redirect } from 'react-router-dom'
import ScriptHeader from './ScriptHeader.jsx'
import ScriptActions from './ScriptActions.jsx'
import ScriptTabs from './ScriptTabs.jsx'

import Divider from '@material-ui/core/Divider'
import { updateCurrentScript } from '../actions.js'

const Script = ({ script, updateCurrentScript }) => {
  if (!script) {
    return <Redirect to='/scripts' />
  }

  useEffect(() => {
    if(script.id) {
      updateCurrentScript(script.id, true)
      
    }
  }, [script.id])

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
    script  }
}

const mapDispatchToProps = (dispatch) => ({
  updateCurrentScript: (script) => dispatch(updateCurrentScript(script))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(toJS(Script))
