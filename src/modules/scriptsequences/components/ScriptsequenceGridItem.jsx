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
} from '@material-ui/core'


import useStyles from './styles/'

const ScriptsequenceGridItem = ({ 
  sequence, 
  progress, 
  isLast,
  script,
  endScript

}) => {
  const classes = useStyles()
  const classname = progress >= 100 ? 'item-played' : 'item'

  if (progress >= 100 && isLast) {
    endScript(script)
  }
 
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
          value={progress} 
          enabled={progress > 0 && progress < 100}
          direction='r-l'
        />
      </GridList>
    </GridListTile>
  )
}

ScriptsequenceGridItem.propTypes = {
  sequence: PropTypes.object.isRequired,
  progress: PropTypes.number,
  isLast: PropTypes.bool,
  endScript: PropTypes.func,
  script: PropTypes.number
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
