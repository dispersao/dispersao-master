import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Grid, IconButton } from '@material-ui/core'
import { Publish, Refresh, Delete } from '@material-ui/icons'
import { createSessioncontent, updateSessioncontentState } from '../actions'
import makeStyles from './styles'
import { getCurrentScriptId } from '../../scripts/selectors'

const Republisher = ({
  id,
  publishContent,
  unpublishContent,
  createContent,
  state,
  script,
  contentType,
  contentId
}) => {
  const classes = makeStyles()

  const onHandlePublish = () => {
    console.log(script, contentType, contentId)
    if(id){
      publishContent()
    } else if(script && contentType && contentId){
      createContent({
        script,
        [contentType]: contentId
      })
    }
  }

  return (
    <Grid item xs className={classes.republisherContainer}>
      <IconButton
        fontSize="small"
        onClick={onHandlePublish}
        className={classes.republisherButton}
      >
        {((!state || state === 'pending') && <Publish />) || null}
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
  createContent: PropTypes.func,
  publishContent: PropTypes.func,
  unpublishContent: PropTypes.func,
  contentType: PropTypes.oneOf(['post', 'comment']),
  contentId: PropTypes.number,
  script: PropTypes.string
}

const mapStateToProps = (state) => ({
  script: getCurrentScriptId(state)
})

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
  },
  createContent: (content) => {
    dispatch(
      createSessioncontent([{
        ...content,
        state: 'published',
        programmed_at: 0
      }])
    )
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Republisher)
