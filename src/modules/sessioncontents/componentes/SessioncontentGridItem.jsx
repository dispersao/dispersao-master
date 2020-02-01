import React from 'react'
import PropTypes from 'prop-types'

import PostListItem from '../../posts/components/PostListItem.jsx'
import SessioncontentCommentItem from './SessioncontentCommentItem.jsx'

import SessioncontentPublisher from './HOC/SessioncontentPublisher.jsx'

import {
  GridListTile,
  GridList,
  Typography,
  Grid
} from '@material-ui/core'

import { toHHMMSS } from '../../../utils/stringUtils'
import useStyles from './styles/'

const SessioncontentGridItem = ({ 
  post,
  state,
  programmed_at
}) => {
  const classes = useStyles()

  let color, text, classname

  if (state === 'pending') {
    color = "secondary"
    text = `programmed to: ${toHHMMSS(programmed_at)}`
    classname = 'item-pending'
  } else {
    color = "primary"
    text = `published at: ${toHHMMSS(programmed_at)}`
    classname = 'item'
  }
  return (
    <GridListTile className={classes[classname]}>
      <Grid container direction="column">
        <Grid item xs>
          <Typography 
            variant="body2" 
            color={color}
          >
            {text}
          </Typography>
        </Grid>
        <GridList 
          cellHeight="auto" 
          cols={1}>
          <PostListItem 
            {...post} 
            CommentComp={SessioncontentCommentItem}
          />
        </GridList>
      </Grid>
    </GridListTile>
  )
}

SessioncontentGridItem.propTypes = {
  post: PropTypes.object.isRequired,
  state: PropTypes.string,
  programmed_at: PropTypes.number,
  script: PropTypes.number
}


export default SessioncontentPublisher(SessioncontentGridItem)
