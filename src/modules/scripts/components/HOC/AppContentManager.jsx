import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import states from '../../utils/stateConstants'
import { 
  createRandomSessioncontent, 
  createSessioncontent 
} from '../../../sessioncontents/actions'

import { toJS } from '../../../../utils/immutableToJs.jsx'

import { getProfileList } from '../../../profiles/selectors'
import { getSessioncontentsListByType } from '../../../sessioncontents/selectors'

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
      publishContent
    } = props

    useEffect(() => {
      if (scriptsequences && scriptsequences.length && connected === 'connected') {
        createRandomAppContent(id)
      }
    }, [scriptsequences.length])

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
            publishContent(profileContent)
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
    publishContent: PropTypes.func
  }


  const mapStateToProps = (state, ownProps) => ({
    profiles: getProfileList(state),
    profileSessioncontent: getSessioncontentsListByType(state, {
      ...ownProps,
      type: 'profile'
    })
  })
  
  const mapDispatchToProps = (dispatch) => ({
    createRandomAppContent: (id) => dispatch(createRandomSessioncontent({
      script: id
    })),
    publishContent: (content) => dispatch(createSessioncontent(content))
  })
  
  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(toJS(AppContentManager))
}

export default WithAppContentManager
