import React, { 
  useEffect, 
  // useState 
} from 'react'
import PropTypes from 'prop-types'

import SequenceGridItem from '../../sequences/components/SequenceGridItem.jsx'

import {
  GridListTile,
  // LinearProgress,
  GridList,
  // withStyles
} from '@material-ui/core'

// import * as styles from '@material-ui/core/styles'

import useStyles from './styles/'

// const BorderLinearProgress = withStyles({
//   root: {
//     height: 10,
//     backgroundColor: '#f8bbd0',
//     marginTop: 5,
//   },
//   bar: {
//     backgroundColor: '#ff6c5c',
//   },
// })(LinearProgress)


const ScriptsequenceGridItem = ({ sequence, progress }) => {
  const classes = useStyles()
  const classname = progress >= 100 ? 'item-played' : 'item'
 
  return (
    <GridListTile 
      className={classes[classname]}>
      <GridList 
        cellHeight="auto" 
        cols={1}>
        <SequenceGridItem {...sequence} />
        { progress > 0 && 
          <div
            className={classes.progressDiv}
            style={{ width: `${progress}%`, height: '100%' }}
          />
        }
        
      </GridList>
    </GridListTile>
  )
}

ScriptsequenceGridItem.propTypes = {
  sequence: PropTypes.object.isRequired,
  progress: PropTypes.number
}

export default ScriptsequenceGridItem
