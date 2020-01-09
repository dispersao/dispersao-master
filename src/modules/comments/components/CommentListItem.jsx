import React from 'react'
import PropTypes from 'prop-types'

import useStyles from './styles/'

import {
  GridListTile,
  Typography,
  Grid
} from '@material-ui/core'

const CommentListItem = ({ contentcreator, content }) => {
  const classes = useStyles()

  return (
    <GridListTile className={classes.item}>
      <Grid container direction="column" spacing={2}>
        <Grid item xs>
          <Typography variant="body2" color="textSecondary">
            {contentcreator.name} commented:
          </Typography>
          <Typography variant="body2" gutterBottom>
            {content} 
          </Typography>
        </Grid>
      </Grid>
    </GridListTile>
  )
}

CommentListItem.propTypes = {
  contentcreator: PropTypes.object,
  content: PropTypes.string
}

export default CommentListItem
