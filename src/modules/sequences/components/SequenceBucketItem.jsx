import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Sequence from './Sequence.jsx'

import PlayedIcon from '@material-ui/icons/ClearOutlined'

import { toJS } from '../../../utils/immutableToJs.jsx'

import useStyles from './styles'
import { getLoading } from '../../scriptsequences/selectors'
import {
  getSequenceIsFiltered,
  getSequenceIsInCurrentScript
} from '../selectors'

const SequenceBucketItem = React.memo(
  ({
    id,
    inCurrentScript = false,
    filtered = false,
    style
  }) => {
    const classname = filtered ? 'enabled' : 'disabled'
    const classes = useStyles()

    return (
      <Sequence
        id={id}
        classNames={classes[classname]}
        style={style}
      >
        {inCurrentScript && <PlayedIcon className={classes.playedIcon} />}
      </Sequence>
    )
  }
)

SequenceBucketItem.propTypes = {
  id: PropTypes.string.isRequired,
  inCurrentScript: PropTypes.bool,
  filtered: PropTypes.bool
}

const mapStateToProps = (state, ownProps) => ({
  loading: getLoading(state),
  filtered: getSequenceIsFiltered(state, ownProps),
  inCurrentScript: getSequenceIsInCurrentScript(state, ownProps)
})

export default connect(mapStateToProps, null)(toJS(SequenceBucketItem))
