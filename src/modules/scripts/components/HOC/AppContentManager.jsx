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

import {
  getCurrentScript,
  getCurrentScriptElapsedTime
} from '../../../scripts/selectors'

import { getProfileList } from '../../../profiles/selectors'
import {
  getCurrentScriptSessioncontentsListByType,
  getNextContentToPublish
} from '../../../sessioncontents/selectors'

const auto_publish = AUTO_PUBLISH

const WithAppContentManager = (WrappedComponent) => {
  const AppContentManager = (props) => {
    const {
      script: { id, connected, state, scriptsequences, manual },
      createRandomAppContent,
      profileSessioncontent,
      profiles,
      createContent,
      publishContent,
      elapsedTime,
      nextContentToPublish
    } = props

    useEffect(() => {
      if (
        !manual &&
        scriptsequences &&
        scriptsequences.length &&
        connected === 'connected'
      ) {
        createRandomAppContent(id)
      }
    }, [scriptsequences.length])

    useEffect(() => {
      if (
        auto_publish &&
        state === states.PLAYING &&
        nextContentToPublish &&
        elapsedTime >= nextContentToPublish.programmed_at
      ) {
        publishContent(nextContentToPublish.id)
      }
    }, [state, elapsedTime, nextContentToPublish])

    useEffect(() => {
      if (state === states.STARTED) {
        if (!profileSessioncontent || !profileSessioncontent.length) {
          if (profiles) {
            const profileContent = profiles.map((p) => ({
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
    script: PropTypes.shape({
      id: PropTypes.number.isRequired,
      connected: PropTypes.string,
      state: PropTypes.string,
      scriptsequences: PropTypes.array
    }),
    createRandomAppContent: PropTypes.func.isRequired,
    profiles: PropTypes.array,
    profileSessioncontent: PropTypes.array,
    publishContent: PropTypes.func,
    createContent: PropTypes.func,
    nextContentToPublish: PropTypes.shape({
      programmed_at: PropTypes.number,
      id: PropTypes.number
    }),
    elapsedTime: PropTypes.number
  }

  const mapStateToProps = (state, ownProps) => ({
    script: getCurrentScript(state),
    profiles: getProfileList(state),
    profileSessioncontent: getCurrentScriptSessioncontentsListByType(state, {
      ...ownProps,
      type: 'profile'
    }),
    elapsedTime: getCurrentScriptElapsedTime(state),
    nextContentToPublish: getNextContentToPublish(state, {
      ...ownProps,
      types: ['post', 'comment']
    })
  })

  const mapDispatchToProps = (dispatch) => ({
    createRandomAppContent: (id) =>
      dispatch(
        createRandomSessioncontent({
          script: id
        })
      ),
    createContent: (content) => dispatch(createSessioncontent(content)),
    publishContent: (id) =>
      dispatch(
        updateSessioncontentState({
          id,
          state: 'published'
        })
      )
  })

  return connect(mapStateToProps, mapDispatchToProps)(toJS(AppContentManager))
}

export default WithAppContentManager
