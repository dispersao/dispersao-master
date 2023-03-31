import React from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'

import { toJS } from '../../../utils/immutableToJs.jsx'

import useStyles from './styles/'

import { GridListTile, Typography, Grid } from '@material-ui/core'
import { getCommentById, getCommentContentcreatorByCommentId } from '../selectors'

const CommentListItem = ({
  contentcreator: { name },
  comment: { content },
  children
}) => {
  const classes = useStyles()

  return (
    <GridListTile className={classes.item}>
      <Grid container direction="column" spacing={2}>
        <Grid item xs>
          <Typography variant="body2" color="textSecondary">
            {name} commented:
          </Typography>
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
  contentcreator: PropTypes.shape({
    name: PropTypes.string
  }).isRequired
}

const mapStateToProps = (state, ownProps) => ({
  comment: getCommentById(state, ownProps),
  contentcreator: getCommentContentcreatorByCommentId(state, ownProps)
})

export default connect(mapStateToProps)(toJS(CommentListItem))
