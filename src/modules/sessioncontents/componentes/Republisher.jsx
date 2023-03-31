import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Grid, IconButton } from '@material-ui/core'
import { Publish, Refresh, Delete } from '@material-ui/icons'
import { updateSessioncontentState } from '../actions'
import makeStyles from './styles'

const Republisher = ({ publishContent, unpublishContent, state }) => {
  const classes = makeStyles()
  return (
    <Grid item xs>
      <IconButton
        fontSize="small"
        onClick={publishContent}
        className={classes.republisherButton}
      >
        {(state === 'pending' && <Publish />) || null}
        {(state === 'published' && <Refresh />) || null}
      </IconButton>
      {(state === 'published' && (
        <IconButton
          fontSize="small"
          className={classes.republisherButton}
          onClick={unpublishContent}
        >
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
    dispatch(
      updateSessioncontentState({
        id: ownProps.id,
        state: 'published'
      })
    )
  },
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
