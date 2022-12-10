import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { GridListTile, GridList } from '@material-ui/core'

import useStyles from './styles'
import Sequence from '../../sequences/components/Sequence.jsx'
import DraggableFactory from '../../../utils/dnd/DraggableFactory.jsx'
import { getScriptsequenceSequenceIdById } from '../selectors.js'
import TimelineRelation from './TimelineRelation.jsx'

const Scriptsequence = React.memo(({
  id,
  index,
  sequence
}) => {
  const classes = useStyles()
  const classesnames = [classes.item]

  return (
    <GridListTile className={classesnames.join(' ')} component={ DraggableFactory(
      `${id}_scrseq`,
      index,
      false,
      false
      //scriptseq.sentToPlayer
    )}>
      <GridList cellHeight="auto" cols={1}>
        <Sequence id={sequence}  />
        <TimelineRelation id={id}/>
      </GridList>
    </GridListTile>
  )
})

Scriptsequence.propTypes = {
  id: PropTypes.number,
  index: PropTypes.number,
  sequence: PropTypes.number
}

const mapStateToProps = (state, ownProps) => ({
  sequence: getScriptsequenceSequenceIdById(state, ownProps)
})

export default connect(mapStateToProps, null)(Scriptsequence)
