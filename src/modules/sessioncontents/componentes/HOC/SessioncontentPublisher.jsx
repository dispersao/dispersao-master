import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { updateSessioncontentState } from '../../actions'

import { toJS } from '../../../../utils/immutableToJs.jsx'

const WithSessioncontentPublisher = WrappedComponent => {
  const SessioncontentPublisher = (props) => {
    const {
      id,
      publishContent,
      unpublishContent
    } = props


    const republish = () => {
      console.log('should republish', id)
      publishContent(id)
    }

    const unpublish = () => {
      console.log('should unpublish', id)
      unpublishContent(id)
    }

    const wrappedProps = {
      ...props
    }
    delete wrappedProps['publishContent']
    
    return (
      <WrappedComponent 
        onRepublish={republish}
        onUnpublish={unpublish}
        {...wrappedProps} 
      />
    )
  }

  SessioncontentPublisher.propTypes = {
    id: PropTypes.number,
    state: PropTypes.string,
    publishContent: PropTypes.func,
    unpublishContent: PropTypes.func,
  }


  const mapDispatchToProps = (dispatch) => ({
    publishContent: (id) => dispatch(updateSessioncontentState({
      id,
      state: 'published'
    })),
    unpublishContent: (id) => dispatch(updateSessioncontentState({
      id,
      state: 'pending'
    }))
  })
  return connect(
    null,
    mapDispatchToProps
  )(toJS(SessioncontentPublisher))
}

export default WithSessioncontentPublisher
