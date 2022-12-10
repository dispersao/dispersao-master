import React from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { toJS } from '../../../utils/immutableToJs.jsx'
import {
  getCurrentScript,
  getScriptById,
  getScriptIsLoaded
} from '../selectors.js'

import { Redirect } from 'react-router-dom'
import ScriptHeader from './ScriptHeader.jsx'
import ScriptActions from './ScriptActions.jsx'
import ScriptTabs from './ScriptTabs.jsx'

import Divider from '@material-ui/core/Divider'
import { useEffect } from 'react'
import { setCurrentScript } from '../actions.js'

const Script = ({
  isScriptLoaded,
  setCurrentScript,
  currentScript,
  match: {
    params: { id }
  }
}) => {
  useEffect(() => {
    if (id && isScriptLoaded && setCurrentScript && id !== currentScript) {
      setCurrentScript(id)
    }
  }, [id, isScriptLoaded, setCurrentScript, currentScript])

  useEffect(() => {
    return () => {
      setCurrentScript(null)
    }
  }, [])

  if (!isScriptLoaded) {
    return <Redirect to="/scripts" />
  }

  return (
    <div>
      {/* <ScriptHeader {...script} /> */}
      <Divider />
      {/* <ScriptActions {...script} /> */}
      {currentScript && <ScriptTabs />}
    </div>
  )
}

Script.propTypes = {
  isScriptLoaded: PropTypes.bool,
  setCurrentScript: PropTypes.func,
  currentScript: PropTypes.string
}

const mapStateToProps = (state, { match }) => {
  const { id } = match.params
  let isScriptLoaded = false
  if (id) {
    isScriptLoaded = getScriptIsLoaded(state, { id })
  }
  const currentScript = getCurrentScript(state)
  return {
    isScriptLoaded,
    currentScript
  }
}

const mapDispatchToProps = (dispatch) => ({
  setCurrentScript: (id) => dispatch(setCurrentScript(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(toJS(Script))
