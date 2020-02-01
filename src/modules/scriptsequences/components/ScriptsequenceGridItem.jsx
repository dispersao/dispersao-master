import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import ProgressBar from './ProgressBar.jsx'
import SequenceGridItem from '../../sequences/components/SequenceGridItem.jsx'

import {
  finishScript
} from '../../scripts/actions'

import {
  GridListTile,
  GridList,
  Typography
} from '@material-ui/core'


import useStyles from './styles/'

const ScriptsequenceGridItem = ({ 
  sequence, 
  elapsedTime, 
  isLast,
  script,
  endScript,
  progress
}) => {
  const classes = useStyles()
  const { duration } = sequence
  const pgr = Math.round((elapsedTime * 100) / duration)
  const classname = pgr >= 100 ? 'item-played' : 'item'

  if (progress >= 100 && isLast) {
    endScript(script)
  }
 
  return (
    <GridListTile 
      className={classes[classname]}>
      <GridList 
        cellHeight="auto" 
        cols={1}>
        <Typography>
          {progress} - {pgr}
        </Typography>
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

const mapDispatchToProps = (dispatch) => ({
  endScript: (id) => dispatch(finishScript({
    id
  }))
})

export default connect(
  null,
  mapDispatchToProps
)(ScriptsequenceGridItem)
