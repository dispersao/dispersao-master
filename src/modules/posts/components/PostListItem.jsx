import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { toJS } from '../../../utils/immutableToJs.jsx'

import { getPostContentcreatorByPostId, getPostById } from '../selectors'

import { getApiUrl } from '../../config/selectors'
import useStyles from './styles/'

import {
  GridListTile,
  Grid,
  Paper,
  Typography,
  GridList
} from '@material-ui/core'

const PostListGridItem = ({
  post: { content, media },
  mediaUrl,
  contentcreator,
  disabled = false,
  children
}) => {
  const classes = useStyles()

  const classname = disabled ? 'disabled' : ''

  return (
    <GridListTile className={classes.item}>
      <Paper className={classes.paper}>
        <Grid container spacing={2} direction="column">
          <Grid
            item
            container
            spacing={2}
            direction="row"
            className={classes[classname]}
          >
            {media && (
              <Grid item className={classes.image}>
                <img
                  className={classes.img}
                  alt="complex"
                  src={`${mediaUrl}${media.url}`}
                />
              </Grid>
            )}
            <Grid item xs={12} sm container>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                  <Typography variant="body2" color="textSecondary">
                    {contentcreator.name} sayd...
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    {content}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          {children}
        </Grid>
      </Paper>
    </GridListTile>
  )
}

PostListGridItem.propTypes = {
  post: PropTypes.shape({
    content: PropTypes.string.isRequired,
    media: PropTypes.object
  }),
  comments: PropTypes.array,
  mediaUrl: PropTypes.string,
  contentcreator: PropTypes.shape({
    name: PropTypes.string
  }),
  disabled: PropTypes.bool,
  children: PropTypes.node
}

const mapStateToProps = (state, ownProps) => ({
  post: getPostById(state, ownProps),
  contentcreator: getPostContentcreatorByPostId(state, ownProps),
  mediaUrl: getApiUrl(state)
})

export default connect(mapStateToProps)(toJS(PostListGridItem))
