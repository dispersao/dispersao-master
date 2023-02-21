import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { GridListTile, GridList } from '@material-ui/core'

import useStyles from './styles'
import Sequence from '../../sequences/components/Sequence.jsx'
import { getScriptsequenceFieldByFieldName, getScriptsequenceSequenceIdById } from '../selectors.js'
import ScriptsequenceTimelineProgress from './ScriptsequenceTimelineProgress.jsx'
import DeleteScriptsequence from './DeleteScriptsequence.jsx'

const Scriptsequence = React.memo(({
  id,
  sentToPlayer,
  sequence
}) => {
  const classes = useStyles()
  const classesnames = [classes.item]
  if(sentToPlayer){
    classesnames.push('dragDisabled')
  }

  return (
    <GridListTile className={classesnames.join(' ')} >
      <GridList cellHeight="auto" cols={1}>
        <Sequence id={sequence}  />
        <ScriptsequenceTimelineProgress id={id}/>
        {!sentToPlayer && <DeleteScriptsequence id={id} />}
      </GridList>
    </GridListTile>
  )
})

Scriptsequence.propTypes = {
  id: PropTypes.number,
  sentToPlayer: PropTypes.bool,
  sequence: PropTypes.number
}

const mapStateToProps = (state, ownProps) => ({
  sequence: getScriptsequenceSequenceIdById(state, ownProps),
  sentToPlayer: getScriptsequenceFieldByFieldName(state, {
    ...ownProps,
    field: 'sentToPlayer'
  })
})

export default connect(mapStateToProps, null)(Scriptsequence)
