import React, { useState, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import useStyles from './styles'

import { GridListTile } from '@material-ui/core'

import { toJS } from '../../../utils/immutableToJs.jsx'
import {
  getSequenceById,
  getSequenceCategoriesById,
  getSequenceLocationById,
  getSequenceTypeById
} from '../selectors'
import SequenceTileBar from './SequenceTileBar.jsx'
import { setPlayingSequence } from '../actions.js'

const HOVER_TIME_FOR_PLAY = 1

const padStart = require('lodash/padStart')

const SequenceGridItem = ({
  sequence,
  location,
  type,
  categories,
  children,
  component = 'li',
  classNames = '',
  onSetPlayingSequence,
  onVideoChange = () => {},
  allowVideoRender = true
}) => {
  const classes = useStyles()
  const { sceneNumber } = sequence

  useEffect(() => {
    return () => {
      clearTimeout(hoverPlayTimer.current)
    }
  }, [])

  const hoverPlayTimer = useRef(null)
  const videoPlayer = useRef(null)
  const elementRef = useRef(null)

  const getCategoryByType = (categoryType) => {
    return categories
      .filter(({ type }) => type === categoryType)
      .map(({ text }) => text)
  }

  const [tileSize, setTileSize] = useState('M')
  const [displayVideo, setDisplayVideo] = useState(false)

    let padCount = isNaN(Number(sceneNumber.slice(-1))) ? 4 : 3
    let fileName = padStart(sceneNumber, padCount, '0')

  const onDescriptionHovered = (hovered) => {
    if (displayVideo && allowVideoRender) {
      return
    } else if (hovered) {
      setTileSize('L')
    } else {
      setTileSize('M')
    }
  }

  const onSequenceHovered = () => {
    hoverPlayTimer.current = setTimeout(() => {
      setDisplayVideo(true)
      setTileSize('S')
    }, HOVER_TIME_FOR_PLAY * 1000)
  }

  const onSequenceHoveredEnd = () => {
    setDisplayVideo(false)
    onVideoChange('stop')
    setTileSize('M')
    clearTimeout(hoverPlayTimer.current)
    hoverPlayTimer.current = null
  }

  const infoRender = displayVideo && allowVideoRender ? (
    <video
      muted
      src={`/videos/compressed/${fileName}.mov`}
      className={classes.internalVideoPlayer}
      autoPlay={true}
      controls={false}
      ref={videoPlayer}
      onLoadStart={() => {
        videoPlayer.current.defaultMuted = true
      }}
      onPlay={() => onVideoChange('play')}
      onEnded={() => {
        setDisplayVideo(false)
        onVideoChange('stop')
      }}
    />
  ) : (
    <>
      <img
        src={`/photos/${fileName}_0_1.jpg`}
        alt={sceneNumber}
        className={classes.image}
        draggable={false}
      />
      )
    </>
  )

  return (
    <GridListTile
      ref={elementRef}
      className={[classes.item, classNames].filter(Boolean).join(' ')}
      component={component}
      onMouseEnter={onSequenceHovered}
      onMouseLeave={onSequenceHoveredEnd}
      onClick={onSetPlayingSequence}
    >
      {infoRender}

      {children}
      <SequenceTileBar
        name={fileName}
        duration={sequence.duration}
        location={location.name}
        type={type.name}
        categories1={getCategoryByType('pos')}
        categories2={getCategoryByType('arc')}
        onHover={onDescriptionHovered}
        infoSize={tileSize}
      />
    </GridListTile>
  )
}

SequenceGridItem.propTypes = {
  sequence: PropTypes.object.isRequired,
  location: PropTypes.object,
  type: PropTypes.object,
  categories: PropTypes.array,
  children: PropTypes.node,
  component: PropTypes.any,
  classNames: PropTypes.string,
  onSetPlayingSequence: PropTypes.func
}

const mapStateToProps = (state, ownProps) => {
  return {
    sequence: getSequenceById(state, ownProps),
    location: getSequenceLocationById(state, ownProps),
    categories: getSequenceCategoriesById(state, ownProps),
    type: getSequenceTypeById(state, ownProps)
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  onSetPlayingSequence: () => {
    dispatch(setPlayingSequence(ownProps.id))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(toJS(SequenceGridItem))
