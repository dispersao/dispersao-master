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
  children,
  headerComponent = null
}) => {
  const classes = useStyles()

  return (
    <GridListTile className={classes.item}>
      <Grid container direction="column" spacing={2}>
        <Grid item xs className={classes.content}>
          <div className={classes.headerContainer}>
            <Contentcreator
              {...contentcreator}
              mediaUrl={mediaUrl}
              text="commented"
              size="small"
            />
            {headerComponent}
          </div>
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
  contentcreator: PropTypes.object.isRequired,
  headerComponent: PropTypes.node
}

const mapStateToProps = (state, ownProps) => ({
  comment: getCommentById(state, ownProps),
  contentcreator: getCommentContentcreatorByCommentId(state, ownProps),
  mediaUrl: getApiUrl(state)
})

export default connect(mapStateToProps)(toJS(CommentListItem))
