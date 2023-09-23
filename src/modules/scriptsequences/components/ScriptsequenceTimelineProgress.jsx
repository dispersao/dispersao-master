import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import ProgressBar from './ProgressBar.jsx'
import PlayArrowIcon from '@material-ui/icons/PlayCircleOutline'
import useStyles from './styles'
import {
  getScriptsequenceById,
  getScriptsequenceSequenceById
} from '../selectors.js'
import { toJS } from '../../../utils/immutableToJs.jsx'

const ScriptsequenceTimelineProgress = React.memo(
  ({
    scriptsequence: { elapsedTime = 0, sentToPlayer = false },
    sequence: {duration}
  }) => {
    const classes = useStyles()
    const pgr = Math.round((elapsedTime * 100) / duration)
    return (
      <>
        <ProgressBar
          value={pgr}
          enabled={pgr > 0 && pgr < 100}
          direction="l-r"
        />
        {pgr < 100 && sentToPlayer && (
          <div className={classes.sentMarker}>
            <PlayArrowIcon />
          </div>
        )}
        {pgr >= 100 && <div className={classes.played} />}
      </>
    )
  }
)

ScriptsequenceTimelineProgress.propTypes = {
  sequence: PropTypes.shape({
    duration: PropTypes.number.isRequired
  }),
  scriptsequence: PropTypes.shape({
    elapsedTime: PropTypes.number,
    sentToPlayer: PropTypes.bool
  })
}

const mapStateToProps = (state, ownProps) => ({
  sequence: getScriptsequenceSequenceById(state, ownProps),
  scriptsequence: getScriptsequenceById(state, ownProps)
})

export default connect(mapStateToProps)(toJS(ScriptsequenceTimelineProgress))
