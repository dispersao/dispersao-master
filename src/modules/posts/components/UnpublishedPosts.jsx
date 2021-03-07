import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { toJS } from '../../../utils/immutableToJs.jsx'
import { getPostsListNotInSession } from '../selectors'

import PostListItem from './PostListItem.jsx'
import useStyles from './styles/'

import CommentListItem from '../../comments/components/CommentListItem.jsx'


import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import {
  GridList,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography
} from '@material-ui/core'


const UnpublishedPosts = ({ posts }) => {
  const classes = useStyles()

  return (
    <>
      {posts && (posts.length || '') && 
        <div className={classes.tabsRoot}>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header">
              <Typography className={classes.heading}>Unpublished Content</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <GridList cellHeight={180}>
                {posts.map((post, key) => <PostListItem key={key} {...post} CommentComp={CommentListItem} />) }
              </GridList>
            </AccordionDetails>
          </Accordion>
        </div>
      }
      
    </>
  )
}

UnpublishedPosts.propTypes = {
  posts: PropTypes.array
}

const mapStateToProps = (state, ownProps) => {
  let posts = getPostsListNotInSession(state, ownProps)
  return {
    posts
  }
}

export default connect(
  mapStateToProps,
  null
)(toJS(UnpublishedPosts))
