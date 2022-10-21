import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { DragPreviewImage, useDrag } from 'react-dnd'

import { toHHMMSS } from '../../../utils/stringUtils'

import useStyles from './styles/'

import { GridListTile, GridListTileBar } from '@material-ui/core'

import PlayedIcon from '@material-ui/icons/ClearOutlined'

import { toJS } from '../../../utils/immutableToJs.jsx'
import { getSequenceById } from '../selectors'

const padStart = require('lodash/padStart')
import { useEffect } from 'react'
import { BorderColor } from '@material-ui/icons'

const SequenceGridItem = ({
  sequence,
  played = false,
  filtered = false,
  draggable = true
}) => {
  const classes = useStyles()

  const [hovered, setHovered] = useState(false)

  const { sceneNumber, location, duration, type, categories } = sequence
  const positionCategories = categories.filter(({ type }) => type === 'pos')
  const arcCategories = categories.filter(({ type }) => type === 'arc')

  const enabledClass = filtered ? 'disabled' : 'enabled'

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
      <div>
        {[...new Set(positionCategories.map(({ text }) => text))].join(', ')}
      </div>
      <div>
        {[...new Set(arcCategories.map(({ text }) => text))].join(', ')}
      </div>
    </>
  ) : (
    <span>{`${location.name}-${type.name}`}</span>
  )

  let isDragging, drag, preview

  if (draggable) {
    ;[{ isDragging }, drag, preview] = useDrag(
      () => ({
        type: 'SEQUENCES',
        collect: (monitor) => ({
          isDragging: !!monitor.isDragging()
        })
      }),
      []
    )
  }

  useEffect(() => {
    if (isDragging) {
      console.log('dragging', fileName)
    }
  }, [isDragging])


  return (
    <>
      {/*draggable && (
        <DragPreviewImage
          connect={preview}
          style={{width: 160, height: 120, BorderColor: 'red', BorderWidth: 'thik', BorderStyle: 'solid'}}
          src={`/photos/${fileName}_0_1.jpg`}
        />
      )*/}

      <GridListTile
        className={[classes.item, classes[enabledClass]].join(' ')}
        ref={(draggable && drag) || null}
      >
        <img
          src={`/photos/${fileName}_0_1.jpg`}
          alt={sceneNumber}
          style={{ opacity: isDragging ? 0.5 : 1 }}
          className={classes.image}
        />
        {played && <PlayedIcon className={classes.playedIcon} />}
        <GridListTileBar
          title={`${fileName} (${toHHMMSS(duration)})`}
          subtitle={subtitleComponent}
          className={classes.tilebar}
          onMouseEnter={onMouseIn}
          onMouseLeave={onMouseOut}
        />
      </GridListTile>
    </>
  )
}

SequenceGridItem.propTypes = {
  sequence: PropTypes.object.isRequired,
  played: PropTypes.bool,
  filtered: PropTypes.bool,
  draggable: PropTypes.bool
}

const mapStateToProps = (state, ownProps) => {
  return {
    sequence: getSequenceById(state, ownProps)
  }
}

export default connect(mapStateToProps, null)(toJS(SequenceGridItem))
