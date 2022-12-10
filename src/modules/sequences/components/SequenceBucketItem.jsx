import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Sequence from './Sequence.jsx'
import DraggableFactory from '../../../utils/dnd/DraggableFactory.jsx'

import PlayedIcon from '@material-ui/icons/ClearOutlined'

import { toJS } from '../../../utils/immutableToJs.jsx'
import { getSequenceById } from '../selectors'


import useStyles from './styles'
import { getLoading } from '../../scriptsequences/selectors'
import { getSequenceIsFiltered, getSequenceIsInCurrentScript } from '../newSelectors'

const SequenceBucketItem = ({
  id,
  index,
  inCurrentScript = false,
  filtered = false,
  loading = false
}) => {
  
const classname = filtered ? 'disabled' : 'enabled'
const classes = useStyles()

  return (
    <Sequence id={id} classes={classes[classname]} component={DraggableFactory(id.toString(), index, true, loading)}>
      {inCurrentScript && <PlayedIcon className={classes.playedIcon} />}
      </Sequence>
  )
}

SequenceBucketItem.propTypes = {
  id: PropTypes.string.isRequired,
  inCurrentScript: PropTypes.bool,
  filtered: PropTypes.bool
}

const mapStateToProps = (state, ownProps) => {
  return {
    sequence: getSequenceById(state, ownProps),
    loading: getLoading(state),
    filtered: getSequenceIsFiltered(state, ownProps) ,
    inCurrentScript: getSequenceIsInCurrentScript(state, ownProps)
  }
}

export default connect(mapStateToProps, null)(
  toJS(SequenceBucketItem)
)
