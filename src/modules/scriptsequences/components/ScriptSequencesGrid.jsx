import React from 'react'
import PropTypes from 'prop-types'
import sortBy from 'lodash/sortBy'
import DropableFactory from '../../../utils/dnd/DropableFactory.jsx'
import ScriptsequenceGridItem from './ScriptsequenceGridItem.jsx'

import useStyles from './styles/'

import { GridList, Typography } from '@material-ui/core'
import DraggableFactory from '../../../utils/dnd/DraggableFactory.jsx'

const ScriptSequencesGrid = ({ scriptsequences }) => {
  const classes = useStyles()

  const sequencesComps = sortBy(scriptsequences, 'index')
    .reverse()
    .map((scriptseq, idx) => {
      const component = DraggableFactory(`${scriptseq.id.toString()}_scrseq`, idx, false)
      return (
        <ScriptsequenceGridItem
          component={component}
          key={scriptseq.id}
          {...scriptseq}
          index={idx}
        />
      )
    })
  return (
    <div>
      <Typography variant="h4" component="h2">
        Timeline
      </Typography>
      <div className={classes.root}>
        <GridList
          cellHeight={120}
          component={DropableFactory('scriptsequences', false)}
        >
          {sequencesComps}
        </GridList>
      </div>
    </div>
  )
}

ScriptSequencesGrid.propTypes = {
  scriptsequences: PropTypes.array.isRequired
}

export default ScriptSequencesGrid
