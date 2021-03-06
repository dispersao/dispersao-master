import React from 'react'
import PropTypes from 'prop-types'

import ProgressBar from './ProgressBar.jsx'
import SequenceGridItem from '../../sequences/components/SequenceGridItem.jsx'


import {
  GridListTile,
  GridList
} from '@material-ui/core'


import useStyles from './styles/'

const ScriptsequenceGridItem = ({ sequence, 
  elapsedTime
}) => {

  const classes = useStyles()
  const { duration } = sequence
  const pgr = Math.round((elapsedTime * 100) / duration)
  const classname = pgr >= 100 ? 'item-played' : 'item'
 
  return (
    <GridListTile 
      className={classes[classname]}>
      <GridList 
        cellHeight="auto" 
        cols={1}>
        <SequenceGridItem 
          {...sequence} 
          subtitleField={'duration'} 
        />
        <ProgressBar 
          value={pgr} 
          enabled={pgr > 0 && pgr < 100}
          direction='r-l'
        />
      </GridList>
    </GridListTile>
  )
}

ScriptsequenceGridItem.propTypes = {
  sequence: PropTypes.object.isRequired,
  elapsedTime: PropTypes.number,
  isLast: PropTypes.bool,
  endScript: PropTypes.func,
  script: PropTypes.number,
  progress: PropTypes.number,
}



export default ScriptsequenceGridItem
