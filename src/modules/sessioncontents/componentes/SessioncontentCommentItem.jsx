import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { toJS } from '../../../utils/immutableToJs.jsx'

import CommentListItem from '../../comments/components/CommentListItem.jsx'

import { toHHMMSS } from '../../../utils/stringUtils'
import useStyles from './styles/'

import {
  GridListTile,
  GridList,
  Typography,
  Grid,
  IconButton
} from '@material-ui/core'
import { getSessioncontentById } from '../selectors.js'
import Republisher from './Republisher.jsx'

const SessioncontentCommentItem = ({
  commentSessioncontent: { comment, state, programmed_at, id },
}) => {
  const allow_republish = ALLOW_REPUBLISH

  const classes = useStyles()

  let color, text, classname

  if (state === 'pending') {
    color = 'secondary'
    text = `programmed to: ${toHHMMSS(programmed_at)}`
    classname = 'item-pending'
  } else {
    color = 'primary'
    text = `published at: ${toHHMMSS(programmed_at)}`
    classname = 'item'
  }

  return (
    <GridListTile className={classes[classname]}>
      <Grid container direction="column">
        <Grid item xs>
          <Grid container direction="row">
            <Grid item xs>
              <Typography variant="body2" color={color}>
                {text}
              </Typography>
            </Grid>
            {(allow_republish && <Republisher id={id} state={state} />) ||
              null}
          </Grid>
        </Grid>
        <GridList cellHeight="auto" cols={1}>
          <CommentListItem id={comment} />
        </GridList>
      </Grid>
    </GridListTile>
  )
}

SessioncontentCommentItem.propTypes = {
  commentSessioncontent: PropTypes.shape({
    comment: PropTypes.number,
    state: PropTypes.string,
    programmed_at: PropTypes.number
  }),
  onRepublish: PropTypes.func,
  onUnpublish: PropTypes.func
}

const mapStateToProps = (state, ownProps) => ({
  commentSessioncontent: getSessioncontentById(state, ownProps)
})

export default connect(mapStateToProps)(toJS(SessioncontentCommentItem))

