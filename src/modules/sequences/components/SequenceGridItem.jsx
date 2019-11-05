import React from 'react'
// import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import {
  makeStyles,
  GridListTile,
  GridListTileBar,
  IconButton
} from '@material-ui/core'

import InfoIcon from '@material-ui/icons/Info'

import { toJS } from '../../../utils/immutableToJs.jsx'
import { getSequenceById } from '../selectors'

const useStyles = makeStyles(() => ({
  item: {
    width: 120,
    height: 120
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.34)',
  },
  tilebar: {
    backgroundColor: 'rgba(0,0,0,0.25)'
  }
}))

const padStart = require('lodash/padStart')

const SequenceGridItem = ({ sequence }) => {

  const { sceneNumber, location, type } = sequence
  
  let padCount = isNaN(Number(sceneNumber.slice(-1))) ? 4 : 3
  let fileName = padStart(sceneNumber, padCount, '0')
  const classes = useStyles()
  return (
    <GridListTile className={classes.item}>
      <img src={`/photos/${fileName}_0_1.jpg`} alt={sceneNumber} />
      <GridListTileBar
        title={fileName}
        subtitle={<span>{`${location} - ${type}`}</span>}
        className={classes.tilebar}
        actionIcon={
          <IconButton aria-label={`info about ${sceneNumber}`} className={classes.icon}>
            <InfoIcon />
          </IconButton>
        }
      />
    </GridListTile>
  )
}

const mapStateToProps = (state, ownProps) => {
  // const seq = 
  return {
    sequence: getSequenceById(state, ownProps)
  }
}

export default connect(
  mapStateToProps,
  null
)(toJS(SequenceGridItem))
