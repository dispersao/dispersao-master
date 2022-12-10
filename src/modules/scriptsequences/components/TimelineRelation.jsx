import React from 'react'
import PropTypes from 'prop-types'

import ProgressBar from './ProgressBar.jsx'
import PlayArrowIcon from '@material-ui/icons/PlayCircleOutline'
import useStyles from './styles'
import { getSequenceBySequenceId } from '../../sequences/selectors.js'
import { connect } from 'react-redux'
import { toJS } from '../../../utils/immutableToJs.jsx'
import { getScriptsequenceById, getScriptsequenceSequenceById } from '../selectors.js'

const TimelineRelation = ({
  scriptsequence,
  sequence
}) => {
  const classes = useStyles()

  const { elapsedTime = 0, sentToPlayer = false } = scriptsequence

  console.log(scriptsequence, sequence)
  
  const { duration } = sequence
  const pgr = Math.round((elapsedTime * 100) / duration)
  if (pgr >= 100) {
    classesnames.push('played')
  }

  return (
    <>
      <ProgressBar value={pgr} enabled={pgr > 0 && pgr < 100} direction="l-r" />
      {pgr < 100 && sentToPlayer && (
        <div className={classes.sentMarker}>
          <PlayArrowIcon />
        </div>
      )}
    </>
  )
}

TimelineRelation.propTypes = {
  scriptsequence: PropTypes.shape({
    elapsedTime: PropTypes.number,
    sentToPlayer: PropTypes.bool
  }),
  sequence: PropTypes.shape({
    duration: PropTypes.number
  })
}

const mapStateToProps = (state, ownProps) => ({
  sequence: getScriptsequenceSequenceById(state, ownProps),
  scriptsequence: getScriptsequenceById(state, ownProps)
})

export default connect(mapStateToProps, null)(toJS(TimelineRelation))
