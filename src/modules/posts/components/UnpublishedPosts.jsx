import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { toJS } from '../../../utils/immutableToJs.jsx'
import { getPostsIds } from '../selectors'
import useStyles from './styles/'

import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import {
  GridList,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography
} from '@material-ui/core'
import UnpublishedPostItem from './UnpublishedPostItem.jsx'

const UnpublishedPosts = ({ posts }) => {
  const classes = useStyles()

  return (
    <>
      {posts && (posts.length || '') && (
        <div className={classes.tabsRoot}>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className={classes.heading}>
                Unpublished Content
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <GridList cellHeight={180}>
                { posts
                  .map((post, key) => (
                    <UnpublishedPostItem id={post} key={key} />
                    )).filter(Boolean)
                  }
              </GridList>
            </AccordionDetails>
          </Accordion>
        </div>
      )}
    </>
  )
}

UnpublishedPosts.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.number)
}

const mapStateToProps = (state, ownProps) => ({
  posts: getPostsIds(state, ownProps)
})

export default connect(mapStateToProps, null)(toJS(UnpublishedPosts))
