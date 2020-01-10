import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
// import states from '../../utils/stateConstants'
import { createRandomSessioncontent } from '../../../sessioncontents/actions'

// const CONTENT_INTERVAL = 120
// const CONTENT_MARGIN_START = 300
// const CONTENT_MARGIN_END = 300

const WithAppContentManager = WrappedComponent => {

  const AppContentManager = (props) => {
    const { 
      id, 
      // totalTime,
      // elapsedTime,
      // averageSeconds,
      createRandomAppContent, 
      // connected,
      // state,
      scriptsequences
    } = props

    useEffect(() => {
      if (scriptsequences && scriptsequences.length && scriptsequences[scriptsequences.length - 1].position) {
        createRandomAppContent(id)
      }
    }, [scriptsequences.length])

    // const afterAppContentStart = totalTime > CONTENT_MARGIN_START
    // const beforeAppContentEnd = totalTime - elapsedTime - CONTENT_MARGIN_END >= 0

   

    const wrappedProps = {
      ...props
    }
    delete wrappedProps['createRandomScriptsequence']
    
    return (
      <>
        <WrappedComponent {...wrappedProps} />
      </>
    )
  }
  
  AppContentManager.propTypes = {
    id: PropTypes.number.isRequired,
    remainingTime: PropTypes.number,
    totalTime: PropTypes.number,
    averageSeconds: PropTypes.number,
    createRandomAppContent: PropTypes.func.isRequired,
    connected:PropTypes.string,
    state: PropTypes.string,
    scriptsequences: PropTypes.array
  }
  
  const mapDispatchToProps = (dispatch) => ({
    createRandomAppContent: (id) => dispatch(createRandomSessioncontent({
      script: id
    }))
  })
  
  return connect(
    null,
    mapDispatchToProps
  )(AppContentManager)
}

export default WithAppContentManager
