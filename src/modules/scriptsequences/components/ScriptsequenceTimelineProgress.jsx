import React from 'react'
import PropTypes from 'prop-types'

import ProgressBar from './ProgressBar.jsx'
import PlayArrowIcon from '@material-ui/icons/PlayCircleOutline'
import useStyles from './styles'

const ScriptsequenceTimelineProgress = ({
  elapsedTime = 0,
  sentToPlayer,
  duration
}) => {
  const classes = useStyles()

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

ScriptsequenceTimelineProgress.propTypes = {
  elapsedTime:PropTypes.number,
  sentToPlayer: PropTypes.bool,
  duration: PropTypes.number
}

export default ScriptsequenceTimelineProgress
