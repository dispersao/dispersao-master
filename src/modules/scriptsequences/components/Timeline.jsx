import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Scriptsequence from './ScriptSequence.jsx'
import { toJS } from '../../../utils/immutableToJs.jsx'

import useStyles from './styles'

import { Typography, CircularProgress } from '@material-ui/core'
import {
  getCurrentScripScriptSequencesSentToPlayer,
  getCurrentScriptScriptsequencesIds,
  getLoading
} from '../selectors.js'
import SortableContainer from '../../../utils/dnd/SortableContainer.jsx'

const Timeline = React.memo(
  ({ scriptsequences, sentToPlayScriptSequences, loading = false }) => {
    const classes = useStyles()
    const getSequencesComps = () =>
      scriptsequences.map((scriptseq, idx) => {
        return <Scriptsequence key={scriptseq} id={scriptseq} index={idx} />
      })
    return (
      <div>
        <Typography variant="h4" component="h2">
          Timeline
        </Typography>
        <div className={classes.root}>
          {!loading && (
            <SortableContainer
              id="timeline"
              data={scriptsequences}
              disabled={sentToPlayScriptSequences}
              type="scriptsequence"
            >
              {getSequencesComps()}
            </SortableContainer>
          )}
          {(loading && <CircularProgress className={classes.loading} />) ||
            null}
        </div>
      </div>
    )
  }
)

Timeline.propTypes = {
  scriptsequences: PropTypes.array.isRequired,
  sentToPlayScriptSequences: PropTypes.array
}

const mapStateToProps = (state) => ({
  loading: getLoading(state),
  scriptsequences: getCurrentScriptScriptsequencesIds(state),
  sentToPlayScriptSequences: getCurrentScripScriptSequencesSentToPlayer(state)
})

export default connect(mapStateToProps, null)(toJS(Timeline))
