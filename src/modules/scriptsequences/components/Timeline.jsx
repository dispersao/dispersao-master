import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Scriptsequence from './ScriptSequence.jsx'
import { toJS } from '../../../utils/immutableToJs.jsx'

import useStyles from './styles'

import { GridList, Typography, CircularProgress } from '@material-ui/core'
import { getCurrentScriptScriptsequencesIds, getLoading } from '../selectors.js'

import Sortable from '../../../utils/dnd/Sortable.jsx'
import WithContextProps from '../../../utils/dnd/HOC/WithContextProps.jsx'

const Timeline = React.memo(({ scriptsequences, loading = false }) => {
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
          <ScriptSequenceSortable
            id="timeline"
            tag={GridList}
            list={scriptsequences}
            setList={(list) => {}}
            ghostClass={classes.ghostDrag}
            groupName="shared"
            sort={true}
            clone={false}
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
