import React from 'react'
import PropTypes from 'prop-types'
import CommentListItem from '../../comments/components/CommentListItem.jsx'

import useStyles from './styles/'

import {
  GridListTile,
  Grid,
  Paper,
  Typography,
  GridList
} from '@material-ui/core'

const PostListGridItem = ({ content, comments, contentcreator, media }) => {
  const classes = useStyles()
  
  return (
    <GridListTile className={classes.item}>
      <Paper className={classes.paper}>
        <Grid container spacing={2} direction="column">
          <Grid item container spacing={2} direction="row">
            {media &&
                <Grid item className={classes.image}>
                  <img className={classes.img} alt="complex" src={media.url} />
                </Grid>
            }
            <Grid item xs={12} sm container>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                  <Typography variant="body2" color="textSecondary" >
                    {contentcreator.name} sayd...
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    {content}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          {comments && (comments.length || '') &&
            <Grid 
              item 
              container 
              spacing={2} 
              direction="column" 
            >
              <GridList className={classes.commentContainer}>
                {comments.map((comment, key) => <CommentListItem key={key} {...comment} />) }
              </GridList>
            </Grid>
          }
        </Grid>
      </Paper>
    </GridListTile>
  )
}

PostListGridItem.propTypes = {
  content: PropTypes.string.isRequired,
  comments: PropTypes.array,
  contentcreator: PropTypes.object.isRequired,
  media: PropTypes.object
}

// const mapStateToProps = (state) => ({
//   url: getApiUrl(state)
// })

// export default connect(
//   mapStateToProps,
//   null
// )(toJS(PostListGridItem))

export default PostListGridItem
