import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import states from '../../utils/stateConstants'
import { 
  createRandomSessioncontent, 
  createSessioncontent,
  updateSessioncontentState
} from '../../../sessioncontents/actions'

import { toJS } from '../../../../utils/immutableToJs.jsx'

import { getScriptTimes } from '../../../scripts/selectors'

import { getProfileList } from '../../../profiles/selectors'
import { getSessioncontentsListByType, getNextContentToPublish } from '../../../sessioncontents/selectors'

const env = ENV || 'prod'
const WithAppContentManager = WrappedComponent => {

  const AppContentManager = (props) => {
    const { 
      id, 
      createRandomAppContent, 
      connected,
      state,
      scriptsequences,
      profileSessioncontent,
      profiles,
      createContent,
      publishContent,
      times: { elapsedTime },
      nextContentToPublish
    } = props
    useEffect(() => {
      if (scriptsequences && scriptsequences.length && connected === 'connected') {
        createRandomAppContent(id)
      }
    }, [scriptsequences.length])

    useEffect(() => {
      if (env === 'prod' && state === states.PLAYING && nextContentToPublish && elapsedTime >= nextContentToPublish.programmed_at) {
        publishContent(nextContentToPublish.id)
      }
    }, [state, elapsedTime, nextContentToPublish])

    useEffect(() => {
      if (state === states.STARTED) {
        if (!profileSessioncontent || !profileSessioncontent.length) {
          if (profiles) {
            const profileContent = profiles.map(p => ({
              state: 'published',
              script: id,
              profile: p.id,
              programmed_at: 0
            }))
            createContent(profileContent)
          }
        }
      }
    }, [state])
   

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
    scriptsequences: PropTypes.array,
    profiles: PropTypes.array,
    profileSessioncontent: PropTypes.array,
    publishContent: PropTypes.func,
    createContent: PropTypes.func,
    nextContentToPublish: PropTypes.shape({
      programmed_at: PropTypes.number,
      id: PropTypes.number
    }),
    times: PropTypes.shape({
      elapsedTime: PropTypes.number
    })
  }


  const mapStateToProps = (state, ownProps) => ({
    profiles: getProfileList(state),
    profileSessioncontent: getSessioncontentsListByType(state, {
      ...ownProps,
      type: 'profile'
    }),
    times: getScriptTimes(state, ownProps),
    nextContentToPublish: getNextContentToPublish(state, { ...ownProps, types: ['post', 'comment'] })
  })
  
  const mapDispatchToProps = (dispatch) => ({
    createRandomAppContent: (id) => dispatch(createRandomSessioncontent({
      script: id
    })),
    createContent: (content) => dispatch(createSessioncontent(content)),
    publishContent: (id) => dispatch(updateSessioncontentState({
      id,
      state: 'published'
    }))
  })
  
  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(toJS(AppContentManager))
}

export default WithAppContentManager
