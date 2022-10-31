import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import sortBy from 'lodash/sortBy'
import DropableFactory from '../../../utils/dnd/DropableFactory.jsx'
import ScriptsequenceGridItem from './ScriptsequenceGridItem.jsx'

import useStyles from './styles/'

import { GridList, Typography, CircularProgress } from '@material-ui/core'
import DraggableFactory from '../../../utils/dnd/DraggableFactory.jsx'
import { getLoading } from '../selectors.js'

const ScriptSequencesGrid = ({ scriptsequences, loading }) => {
  const classes = useStyles()

  const getSequencesComps = () =>
    sortBy(scriptsequences, 'index')
      // .reverse()
      .map((scriptseq, idx) => {
        const component = DraggableFactory(
          `${scriptseq.id.toString()}_scrseq`,
          idx,
          false
        )
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
          component={(!loading && DropableFactory('scriptsequences', false) || 'ul')}
          className={classes.list}
        >
          {(!loading && getSequencesComps()) || null}
          {(loading && <CircularProgress />) || null}
        </GridList>
      </div>
    </div>
  )
}

ScriptSequencesGrid.propTypes = {
  scriptsequences: PropTypes.array.isRequired
}

const mapStateToProps = (state) => ({
  loading: getLoading(state)
})

export default connect(mapStateToProps, null)(ScriptSequencesGrid)
