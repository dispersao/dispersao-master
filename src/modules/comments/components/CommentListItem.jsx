import React from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'

import { toJS } from '../../../utils/immutableToJs.jsx'

import useStyles from './styles/'

import { GridListTile, Typography, Grid } from '@material-ui/core'
import {
  getCommentById,
  getCommentContentcreatorByCommentId
} from '../selectors'
import { getApiUrl } from '../../config/selectors.js'
import Contentcreator from '../../contentcreators/components/Contentcreator.jsx'

const CommentListItem = ({
  contentcreator,
  mediaUrl,
  comment: { content },
  children
}) => {
  const classes = useStyles()

  return (
    <GridListTile className={classes.item}>
      <Grid container direction="column" spacing={2}>
        <Grid item xs className={classes.content}>
          <Contentcreator
            {...contentcreator}
            mediaUrl={mediaUrl}
            text="commented"
            size="small"
          />
          <Typography variant="body2" gutterBottom>
            {content}
          </Typography>
        </Grid>
        {children}
      </Grid>
    </GridListTile>
  )
}

CommentListItem.propTypes = {
  comment: PropTypes.shape({
    content: PropTypes.string
  }),
  mediaUrl: PropTypes.string,
  contentcreator: PropTypes.object.isRequired
}

const mapStateToProps = (state, ownProps) => ({
  comment: getCommentById(state, ownProps),
  contentcreator: getCommentContentcreatorByCommentId(state, ownProps),
  mediaUrl: getApiUrl(state)
})

export default connect(mapStateToProps)(toJS(CommentListItem))
