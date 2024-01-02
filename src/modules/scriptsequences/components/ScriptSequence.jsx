import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { GridList } from '@material-ui/core'

import useStyles from './styles'
import Sequence from '../../sequences/components/Sequence.jsx'
import {
  getScriptsequenceFieldByFieldName,
  getScriptsequenceSequenceIdById,
  getCurrentScriptPlaceholderScriptSequence
} from '../selectors.js'
import ScriptsequenceTimelineProgress from './ScriptsequenceTimelineProgress.jsx'

const Scriptsequence = React.memo(
  ({ id, sequence, sentToPlayer, isPlaceholder }) => {
    const classes = useStyles()

    if (sequence) {
      return (
        <GridList cellHeight="auto" cols={1} className={classes.item}>
          <Sequence
            id={sequence}
            classNames={isPlaceholder ? classes.placeholder : ''}
          />
          {sentToPlayer && <ScriptsequenceTimelineProgress id={id} />}
        </GridList>
      )
    } else {
      return null
    }
  }
)

Scriptsequence.propTypes = {
  id: PropTypes.number,
  sentToPlayer: PropTypes.bool,
  sequence: PropTypes.number,
  isPlaceholder: PropTypes.bool
}

const mapStateToProps = (state, ownProps) => {
  const placeholder = getCurrentScriptPlaceholderScriptSequence(state)
  if (placeholder && placeholder.get('id') === ownProps.id) {
    return {
      sequence: placeholder.get('sequence'),
      sentToPlayer: false,
      isPlaceholder: true
    }
  } else {
    return {
      sequence: getScriptsequenceSequenceIdById(state, ownProps),
      sentToPlayer: getScriptsequenceFieldByFieldName(state, {
        ...ownProps,
        field: 'sentToPlayer'
      }),
      isPlaceholder: false
    }
  }
}

export default connect(mapStateToProps, null)(Scriptsequence)
