import React from 'react'
// import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import sortBy from 'lodash/sortBy'

import ScriptsequenceGridItem from './ScriptsequenceGridItem.jsx'

import useStyles from './styles/'

import {
  GridList,
  Typography
} from '@material-ui/core'

const ScriptSequencesGrid = ({ scriptsequences }) => {
  const classes = useStyles()

  const sequencesComps = sortBy(scriptsequences, 'index')
    .reverse()
    .map((scriptseq, key) => {
      return <ScriptsequenceGridItem key={key} {...scriptseq}/>
    })
  return (
    <div >
      <Typography variant="h4" component="h2">Timeline</Typography>
      <div className={classes.root}>
        <GridList cellHeight={180}>
          { sequencesComps }
        </GridList>
      </div>
    </div>
  )
}

ScriptSequencesGrid.propTypes = {
  scriptsequences: PropTypes.array.isRequired
}

export default ScriptSequencesGrid
