import React from 'react'
import PropTypes from 'prop-types'

import PostListItem from '../../posts/components/PostListItem.jsx'

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
  const color = state === 'pending' ? "secondary" : "secondary"
  const text = state === 'pending' ? `programmed to: ${toHHMMSS(programmed_at)}` : 'published'

  return (
    <GridListTile className={classes.item}>
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


export default SessioncontentGridItem
