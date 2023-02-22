import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { toHHMMSS } from '../../../utils/stringUtils'

import useStyles from './styles'

import { GridListTile, GridListTileBar } from '@material-ui/core'

import { toJS } from '../../../utils/immutableToJs.jsx'
import {
  getSequenceById,
  getSequenceCategoriesById,
  getSequenceLocationById,
  getSequenceTypeById
} from '../selectors'

const padStart = require('lodash/padStart')

const SequenceGridItem = React.memo(({
  sequence,
  location,
  type,
  categories,
  children,
  component = 'li',
  classNames = ''
}) => {
  const classes = useStyles()

  const [hovered, setHovered] = useState(false)

  const { sceneNumber, duration } = sequence
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

  return (
    <GridListTile
      className={[classes.item, classNames].filter(Boolean).join(' ')}
      component={component}
    >
      <img
        src={`/photos/${fileName}_0_1.jpg`}
        alt={sceneNumber}
        className={classes.image}
        draggable={false}
      />
      {children}
      <GridListTileBar
        title={`${fileName} (${toHHMMSS(duration)})`}
        subtitle={subtitleComponent}
        className={classes.tilebar}
        onMouseEnter={onMouseIn}
        onMouseLeave={onMouseOut}
      />
    </GridListTile>
  )
})

SequenceGridItem.propTypes = {
  sequence: PropTypes.object.isRequired,
  location: PropTypes.object,
  type: PropTypes.object,
  categories: PropTypes.array,
  children: PropTypes.node,
  component: PropTypes.any,
  classNames: PropTypes.string
}

const mapStateToProps = (state, ownProps) => {
  return {
    sequence: getSequenceById(state, ownProps),
    location: getSequenceLocationById(state, ownProps),
    categories: getSequenceCategoriesById(state, ownProps),
    type: getSequenceTypeById(state, ownProps)
  }
}

export default connect(mapStateToProps, null)(toJS(SequenceGridItem))
