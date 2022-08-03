import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { toHHMMSS } from '../../../utils/stringUtils'

import useStyles from './styles/'

import {
  GridListTile,
  GridListTileBar
  // IconButton
} from '@material-ui/core'

import { toJS } from '../../../utils/immutableToJs.jsx'
import { getSequenceById } from '../selectors'

const padStart = require('lodash/padStart')

const SequenceGridItem = ({ sequence }) => {
  const [hovered, setHovered] = useState(false)
  const classes = useStyles()
  const { sceneNumber, location, duration, type, categories } = sequence
  const positionCategories = categories.filter(({ type }) => type === 'pos')
  const arcCategories = categories.filter(({ type }) => type === 'arc')

  let padCount = isNaN(Number(sceneNumber.slice(-1))) ? 4 : 3
  let fileName = padStart(sceneNumber, padCount, '0')

  const onMouseIn = () => {
    setHovered(true)
  }

  const onMouseOut = () => {
    setHovered(false)
  }

  const subtitleComponent = hovered ? (
    <>
      <div>{`${location.name}-${type.name}`}</div>
      <div>{[...new Set(positionCategories.map(({ text }) => text))].join(', ')}</div>
      <div>{[...new Set(arcCategories.map(({ text }) => text))].join(', ')}</div>

    </>
  ) : (
    <span>{`${location.name}-${type.name}`}</span>
  )

  return (
    <GridListTile
      className={classes.item}
    >
      <img src={`/photos/${fileName}_0_1.jpg`} alt={sceneNumber} />
      <GridListTileBar
        title={`${fileName} (${toHHMMSS(duration)})`}
        subtitle={subtitleComponent}
        className={classes.tilebar}
        onMouseEnter={onMouseIn}
        onMouseLeave={onMouseOut}
        /*actionIcon={
          <IconButton aria-label={`info about ${sceneNumber}`} className={classes.icon}>
            <InfoIcon />
          </IconButton>
        }*/
      />
    </GridListTile>
  )
}

SequenceGridItem.propTypes = {
  sequence: PropTypes.object.isRequired
}

const mapStateToProps = (state, ownProps) => {
  return {
    sequence: getSequenceById(state, ownProps)
  }
}

export default connect(mapStateToProps, null)(toJS(SequenceGridItem))
