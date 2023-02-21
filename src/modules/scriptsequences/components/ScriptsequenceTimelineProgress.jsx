import React from 'react'
import PropTypes from 'prop-types'

import WithScriptsequenceTimer from './HOC/helpers/ScriptsequenceTimer.jsx'

import ProgressBar from './ProgressBar.jsx'
import PlayArrowIcon from '@material-ui/icons/PlayCircleOutline'
import useStyles from './styles'

const ScriptsequenceTimelineProgress = React.memo(({
  id,
  elapsedTime = 0,
  sentToPlayer,
  duration
}) => {
  const classes = useStyles()
  const pgr = Math.round((elapsedTime * 100) / duration)
  return (
    <>
    {/**<div className={classes.id}>{id}</div>**/}
      <ProgressBar value={pgr} enabled={pgr > 0 && pgr < 100} direction="l-r" />
      {pgr < 100 && sentToPlayer && (
        <div className={classes.sentMarker}>
          <PlayArrowIcon />
        </div>
      )}
      { pgr >= 100 && 
      <div className={classes.played}/>
      }
    </>
  )
})

ScriptsequenceTimelineProgress.propTypes = {
  elapsedTime: PropTypes.number,
  sentToPlayer: PropTypes.bool,
  duration: PropTypes.number
}

export default WithScriptsequenceTimer(ScriptsequenceTimelineProgress)
