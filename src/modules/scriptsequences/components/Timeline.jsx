import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import sortBy from 'lodash/sortBy'
import DropableFactory from '../../../utils/dnd/DropableFactory.jsx'
import Scriptsequence from './ScriptSequence.jsx'
import { toJS } from '../../../utils/immutableToJs.jsx'

import useStyles from './styles'

import { GridList, Typography, CircularProgress } from '@material-ui/core'
import { getCurrentScriptScriptsequencesIds, getLoading } from '../selectors.js'

const Timeline = React.memo(({ scriptsequences, loading = false }) => {
  const classes = useStyles()

  const getSequencesComps = () =>
    sortBy(scriptsequences, 'index').map((scriptseq, idx) => {
      return <Scriptsequence key={scriptseq} id={scriptseq} index={idx} />
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
          {!loading && getSequencesComps()}
          {(loading && <CircularProgress className={classes.loading} />) ||
            null}
        </GridList>
      </div>
    </div>
  )
})

Timeline.propTypes = {
  scriptsequences: PropTypes.array.isRequired
}

const mapStateToProps = (state) => ({
  loading: getLoading(state),
  scriptsequences: getCurrentScriptScriptsequencesIds(state)
})

export default connect(mapStateToProps, null)(toJS(Timeline))