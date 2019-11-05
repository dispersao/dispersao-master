import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { toJS } from '../../../utils/immutableToJs.jsx'

import SequenceGridItem from './SequenceGridItem.jsx'

import { getSequenceListNotInScript } from '../selectors'
import {
  makeStyles,
  GridList
} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
  }
}))

const UnplayedSequences = ({ sequences }) => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <GridList cellHeight={180} className={classes.gridList}>
        {sequences.map((seq, key) => <SequenceGridItem key={key} {...seq} />) }
      </GridList>
    </div>
  )
}

UnplayedSequences.propTypes = {
  sequences: PropTypes.array
}

const mapStateToProps = (state, ownProps) => ({
  sequences: getSequenceListNotInScript(state, ownProps)
})

export default connect(
  mapStateToProps,
  null
)(toJS(UnplayedSequences))
