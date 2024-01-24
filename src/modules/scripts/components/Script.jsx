import React from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { toJS } from '../../../utils/immutableToJs.jsx'
import {
  getCurrentScriptId,
  getScriptIsLoaded
} from '../selectors.js'

import { Redirect } from 'react-router-dom'
import ScriptHeader from './ScriptHeader.jsx'
import ScriptActions from './ScriptActions.jsx'
import ScriptTabs from './ScriptTabs.jsx'

import Divider from '@material-ui/core/Divider'
import { useEffect } from 'react'
import { setCurrentScript } from '../actions.js'
import VideoPlayer from '../../sequences/components/VideoPlayer.jsx'
import { getPlayingSequenceId } from '../../sequences/selectors.js'

const Script = ({
  isScriptLoaded,
  setCurrentScript,
  currentScript,
  playingSequence,
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
      {currentScript && (
        <>
          <ScriptHeader />
          <Divider />
          <ScriptActions />
          <div style={{ display: 'flex' , direction: 'column'}}>
            <ScriptTabs />
            <VideoPlayer id={playingSequence} />
          </div>
        </>
      )}
    </div>
  )
}

Script.propTypes = {
  isScriptLoaded: PropTypes.bool,
  setCurrentScript: PropTypes.func,
  currentScript: PropTypes.string,
  playingSequence: PropTypes.string
}

const mapStateToProps = (state, { match }) => {
  const { id } = match.params
  let isScriptLoaded = false
  if (id) {
    isScriptLoaded = getScriptIsLoaded(state, { id })
  }
  const currentScript = getCurrentScriptId(state)

  const playingSequence = getPlayingSequenceId(state)
  return {
    isScriptLoaded,
    currentScript,
    playingSequence
  }
}

const mapDispatchToProps = (dispatch) => ({
  setCurrentScript: (id) => dispatch(setCurrentScript(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(toJS(Script))
