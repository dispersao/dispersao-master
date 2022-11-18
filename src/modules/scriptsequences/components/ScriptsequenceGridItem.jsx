import React from 'react'
import PropTypes from 'prop-types'

import ProgressBar from './ProgressBar.jsx'
import SequenceGridItem from '../../sequences/components/SequenceGridItem.jsx'
import PlayArrowIcon from '@material-ui/icons/PlayCircleOutline'

import { GridListTile, GridList } from '@material-ui/core'

import useStyles from './styles/'

const ScriptsequenceGridItem = React.memo(({
  sequence,
  elapsedTime,
  index,
  sentToPlayer,
  component = 'li'
}) => {
  const classes = useStyles()
  const { duration } = sequence
  const pgr = Math.round((elapsedTime * 100) / duration)
  const classesnames = [classes.item]
  if (pgr >= 100) {
    classesnames.push('played')
  }

  return (
    <GridListTile className={classesnames.join(' ')} component={component}>
      <GridList cellHeight="auto" cols={1}>
        <SequenceGridItem
          {...sequence}
          index={index}
          subtitleField={'duration'}
        />
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
      </GridList>
    </GridListTile>
  )
})

ScriptsequenceGridItem.propTypes = {
  sequence: PropTypes.object.isRequired,
  elapsedTime: PropTypes.number,
  isLast: PropTypes.bool,
  endScript: PropTypes.func,
  script: PropTypes.number,
  sentToPlayer: PropTypes.bool,
  progress: PropTypes.number
}

export default ScriptsequenceGridItem
