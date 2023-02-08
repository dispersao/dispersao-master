import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Grid, IconButton } from '@material-ui/core'
import { Publish, Refresh, Delete } from '@material-ui/icons'
import { updateSessioncontentState } from '../actions'

const Republisher = ({ publishContent, unpublishContent, state }) => {
  return (
    <Grid item xs>
      <IconButton fontSize="small" onClick={publishContent}>
        {(state === 'pending' && <Publish />) || null}
        {(state === 'published' && <Refresh />) || null}
      </IconButton>
      {(state === 'published' && (
        <IconButton fontSize="small" onClick={unpublishContent}>
          <Delete />
        </IconButton>
      )) ||
        null}
    </Grid>
  )
}

Republisher.propTypes = {
  id: PropTypes.number,
  publishContent: PropTypes.func,
  unpublishContent: PropTypes.func
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  publishContent: () => {
    console.log(ownProps.id)
    dispatch(
      updateSessioncontentState({
        id: ownProps.id,
        state: 'published'
      })
    )},
  unpublishContent: () => {
    dispatch(
      updateSessioncontentState({
        id: ownProps.id,
        state: 'pending'
      })
    )
  }
})

export default connect(null, mapDispatchToProps)(Republisher)
