import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { updateSessioncontentState } from '../../actions'

import { getScriptTimes } from '../../../scripts/selectors'
import { toJS } from '../../../../utils/immutableToJs.jsx'

const WithSessioncontentPublisher = WrappedComponent => {
  const SessioncontentPublisher = (props) => {
    const {
      id,
      programmed_at,
      times,
      state,
      publishContent,
    } = props

    const { elapsedTime } = times

    useEffect(() => {
      if (state === 'pending' && elapsedTime >= programmed_at) {
        publishContent(id)
      }
    }, [elapsedTime, state ])

    const wrappedProps = {
      ...props
    }
    delete wrappedProps['publishContent']
    
    return (
      <WrappedComponent {...wrappedProps} />
    )
  }

  SessioncontentPublisher.propTypes = {
    id: PropTypes.number,
    programmed_at: PropTypes.number,
    times: PropTypes.object,
    state: PropTypes.string,
    publishContent: PropTypes.func
  }

  const mapStateToProps = (state, ownprops) => ({
    times: getScriptTimes(state, { id: ownprops.script })
  })

  const mapDispatchToProps = (dispatch) => ({
    publishContent: (id) => dispatch(updateSessioncontentState({
      id,
      state: 'published'
    }))
  })
  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(toJS(SessioncontentPublisher))
}

export default WithSessioncontentPublisher
