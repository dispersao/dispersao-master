import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { updateSessioncontentState } from '../../actions'


const WithSessioncontentPublisher = WrappedComponent => {
  const SessioncontentPublisher = (props) => {
    const {
      id,
      publishContent,
      unpublishContent
    } = props


    const republish = () => {
      publishContent(id)
    }

    const unpublish = () => {
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
    id: PropTypes.any,
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
  )(SessioncontentPublisher)
}

export default WithSessioncontentPublisher
