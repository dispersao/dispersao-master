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

const ScriptSequencesGrid = React.memo(
  ({ scriptsequences, loading = false }) => {
    const classes = useStyles()

    const getSequencesComps = () =>
      sortBy(scriptsequences, 'index')
        .map((scriptseq, idx) => {
          const component = DraggableFactory(
            `${scriptseq.id.toString()}_scrseq`,
            idx,
            false,
            scriptseq.sentToPlayer
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
            component={DropableFactory('scriptsequences', false)}
            className={classes.list}
          >
            <>{!loading && getSequencesComps()}</>
            {(loading && <CircularProgress className={classes.loading} />) ||
              null}
          </GridList>
        </div>
      </div>
    )
  }
)

ScriptSequencesGrid.propTypes = {
  scriptsequences: PropTypes.array.isRequired
}

const mapStateToProps = (state) => ({
  loading: getLoading(state)
})

export default connect(mapStateToProps, null)(ScriptSequencesGrid)
