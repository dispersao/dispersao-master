import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { GridListTileBar } from '@material-ui/core'

import { toHHMMSS } from '../../../utils/stringUtils'

import useStyles from './styles'

const SequenceTileBar = ({
  duration,
  name,
  location,
  type,
  categories1,
  categories2,
  infoSize = 'M',
  onHover
}) => {
  const classes = useStyles()

  const onHovered = () => {
    onHover(true)
  }

  const onHoveredEnd = () => {
    onHover(false)
  }
  const subtitleComponent = () => {
    switch (infoSize) {
      case 'S':
        return null
      case 'M':
        return <span>{`${location}-${type}`}</span>
      case 'L':
        return (
          <>
            <div>{`${location}-${type}`}</div>
            <div>{categories1.join(', ')}</div>
            <div>{categories2.join(', ')}</div>
          </>
        )
    }
  }

  return (
    <GridListTileBar
      title={`${name} (${toHHMMSS(duration)})`}
      subtitle={subtitleComponent()}
      className={classes[`sequenceinfo${infoSize}`]}
      onMouseEnter={onHovered}
      onMouseLeave={onHoveredEnd}
    />
  )
}

SequenceTileBar.propTypes = {
  duration: PropTypes.number,
  name: PropTypes.string,
  location: PropTypes.string,
  type: PropTypes.string,
  categories: PropTypes.array,
  infoSize: PropTypes.string,
  onHover: PropTypes.func
}

export default SequenceTileBar
