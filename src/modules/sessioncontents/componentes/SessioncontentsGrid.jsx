import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import sortBy from 'lodash/sortBy'

import { toJS } from '../../../utils/immutableToJs.jsx'

import { getSessioncontentsListAsPosts } from '../selectors'
import SessioncontentGridItem from './SessioncontentGridItem.jsx'

import useStyles from './styles/'

import {
  GridList,
  Typography
} from '@material-ui/core'


const SessioncontentsGrid = ({ contents }) => {
  const classes = useStyles()

  const sessioncontents = sortBy(contents, 'programmed_at')
    .reverse()
    .map((sescon, key) => {
      return (
        <SessioncontentGridItem 
          key={key} 
          {...sescon}
        />
      )
    })

  return (
    <div >
      <Typography variant="h4" component="h2">Session content</Typography>
      <div className={classes.root}>
        <GridList cellHeight={180}>
          { sessioncontents }
        </GridList>
      </div>
    </div>
  )
}

SessioncontentsGrid.propTypes = {
  contents: PropTypes.array,
}

const mapStateToProps = (state, ownprops) => ({
  contents: getSessioncontentsListAsPosts(state, ownprops),
})

export default connect(
  mapStateToProps,
  null
)(toJS(SessioncontentsGrid))
