import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Scriptsequence from './ScriptSequence.jsx'
import { toJS } from '../../../utils/immutableToJs.jsx'

import useStyles from './styles'

import {
  GridList,
  Typography,
  CircularProgress,
  Button
} from '@material-ui/core'
import { getCurrentScriptScriptsequencesIds, getLoading } from '../selectors.js'

import Sortable from '../../../utils/dnd/Sortable.jsx'
import WithContextProps from '../../../utils/dnd/HOC/WithContextProps.jsx'

const Timeline = React.memo(({ scriptsequences, headerChildren, loading = false }) => {
  const classes = useStyles()
  const getSequencesComps = () =>
    scriptsequences.map((scriptseq, idx) => {
      return <Scriptsequence key={scriptseq} id={scriptseq} index={idx} />
    })
  return (
    <div>
      <div className={classes.titleContainer}>
        <Typography variant="h4" component="h2">
          Timeline
        </Typography>
        {headerChildren}
      </div>
      <div className={classes.root}>
        {!loading && (
          <ScriptSequenceSortable
            id="timeline"
            tag={GridList}
            list={scriptsequences}
            setList={(list) => {}}
            ghostClass={classes.ghostDrag}
            groupName="shared"
            sort={true}
            clone={false}
            className={classes.timeline}
          >
            {getSequencesComps()}
          </ScriptSequenceSortable>
        )}
        {(loading && <CircularProgress className={classes.loading} />) || null}
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

const ScriptSequenceSortable = WithContextProps(Sortable, {
  onEnd: 'onDropScriptsequence'
})
