import React from 'react'
import { connect } from 'react-redux'
import Sequence from '../../modules/sequences/components/Sequence.jsx'
import { DragOverlay } from '@dnd-kit/core'
import { getScriptsequenceSequenceIdById } from '../../modules/scriptsequences/selectors.js'

const DNDOverlay = ({ sequence }) => {
  return (
    <DragOverlay dropAnimation={null}>
      {sequence ? <Sequence id={sequence} /> : null}
    </DragOverlay>
  )
}

const mapStateToProps = (state, ownProps) => {
  if(ownProps.type === "scriptsequence"){
    return {
      sequence: getScriptsequenceSequenceIdById(state, ownProps)
    }
  } else if(ownProps.type === "sequence"){
    return {
      sequence: ownProps.id
    }
  } else {
    return {
      sequence: null
    }
  }
}

export default connect(mapStateToProps, null)(DNDOverlay)
