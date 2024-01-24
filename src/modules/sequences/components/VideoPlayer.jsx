import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Box, Button, Typography } from '@material-ui/core'
import {
  getSequenceById,
  getSequenceCategoriesById,
  getSequenceIsInCurrentScript,
  getSequenceLocationById,
  getSequenceTypeById,
  getSequenceCharactersById
} from '../selectors'
const padStart = require('lodash/padStart')
import { toHHMMSS } from '../../../utils/stringUtils'
import { toJS } from '../../../utils/immutableToJs.jsx'
import CloseIcon from '@material-ui/icons/Close'

import useStyles from './styles'
import { setPlayingSequence } from '../actions'

const VideoPlayer = ({
  sequence,
  location,
  type,
  categories,
  onClose,
  characters
}) => {
  if (!sequence) return null
  const classes = useStyles()

  const { duration, sceneNumber } = sequence

  let padCount = isNaN(Number(sceneNumber.slice(-1))) ? 4 : 3
  let fileName = padStart(sceneNumber, padCount, '0')
  const getCategoryByType = (categoryType) => {
    return categories
      .filter(({ type }) => type === categoryType)
      .map(({ text }) => text)
  }

  const arcs = getCategoryByType('arc')
  const poss = getCategoryByType('pos')
  return (
    <Box className={classes.videoPlayerContainer}>
      <Button className={classes.playerClose} onClick={onClose}>
        <CloseIcon />
      </Button>
      <Typography variant="h5">{fileName}</Typography>
      <Typography variant="h6">
        {location.name} - {type.name}
      </Typography>
      <video
        className={classes.videoPlayer}
        src={`/videos/${fileName}.mov`}
        autoPlay={true}
        controls={true}
      />
      <Typography variant="body2">duration: {toHHMMSS(duration)}</Typography>
      {(arcs.length && (
        <Typography variant="body2">arcs: {arcs.join(', ')}</Typography>
      )) ||
        null}
      {(poss.length && (
        <Typography variant="body2">positions: {poss.join(', ')}</Typography>
      )) ||
        null}
      {(characters.length && (
        <Typography variant="body2">
          characters:{' '}
          {characters
            .map(({ name }) => name)
            .join(', ')
            .toLowerCase()}
        </Typography>
      )) ||
        null}
    </Box>
  )
}

VideoPlayer.propTypes = {
  id: PropTypes.string,
  sequence: PropTypes.object,
  location: PropTypes.object,
  type: PropTypes.object,
  categories: PropTypes.array
}

const mapStateToProps = (state, ownProps) => {
  if (ownProps.id) {
    return {
      sequence: getSequenceById(state, ownProps),
      location: getSequenceLocationById(state, ownProps),
      categories: getSequenceCategoriesById(state, ownProps),
      type: getSequenceTypeById(state, ownProps),
      characters: getSequenceCharactersById(state, ownProps),
      inCurrentScript: getSequenceIsInCurrentScript(state, ownProps)
    }
  } else {
    return {
      sequence: null,
      location: null,
      categories: null,
      type: null,
      inCurrentScript: false
    }
  }
}

const mapDispatchToProps = (dispatch) => ({
  onClose: () => dispatch(setPlayingSequence(null))
})

export default connect(mapStateToProps, mapDispatchToProps)(toJS(VideoPlayer))
