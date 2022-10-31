import React from 'react'
import PropTypes from 'prop-types'
import { DragDropContext } from 'react-beautiful-dnd'
import { connect } from 'react-redux'
import {
  deleteScriptsequence,
  bulkupdateScriptsequence,
  createUpdateDeleteScriptsequences
} from '../../modules/scriptsequences/actions'
import { getLoading } from '../../modules/scriptsequences/selectors'
import { getSequenceList } from '../../modules/sequences/selectors'
import { toJS } from '../immutableToJs.jsx'
import { orderBy } from 'lodash'

const DragContext = ({
  children,
  script,
  loading,
  createUpdateDelete,
  scriptsequences = [],
  sequences = []
}) => {
  const orderedScriptsequences = orderBy(scriptsequences, 'index')

  const reorderScriptsequences = (source, destination) => {
    const moveForward = source.index > destination.index
    const movedScriptSequence = orderedScriptsequences[source.index]
    const iniSlice = moveForward ? destination.index : source.index + 1
    const endSlice = moveForward ? source.index : destination.index + 1
    let reordered = orderedScriptsequences.slice(iniSlice, endSlice)
    reordered = reordered.map(({ id, index, sequence: { sceneNumber } }) => ({
      id,
      index: moveForward ? index + 1 : index - 1,
      seq: sceneNumber
    }))
    reordered.push({
      id: movedScriptSequence.id,
      index: destination.index,
      seq: movedScriptSequence.sequence.sceneNumber
    })

    reordered = (reordered.length && reordered) || null

    createUpdateDelete(null, reordered)

    console.log(
      'after reordering script sequences',
      iniSlice,
      endSlice,
      reordered
    )
  }

  const removeScriptsequence = (source) => {
    const removedScriptsequence = orderedScriptsequences[source.index]

    let reordered = orderedScriptsequences
      .slice(source.index + 1)
      .map(({ id, index, sequence: { sceneNumber } }) => ({
        id,
        index: index - 1,
        seq: sceneNumber
      }))

    reordered = (reordered.length && reordered) || null

    createUpdateDelete(null, reordered, removedScriptsequence.id)
  }

  const createScriptsequence = (source, destination) => {
    const sequenceRef = sequences[source.index]
    const newScriptSequence = {
      script,
      sequence: sequenceRef.id,
      index: destination.index
    }
    let reordered = orderedScriptsequences
      .slice(destination.index)
      .map(({ id, index, sequence: { sceneNumber } }) => ({
        id,
        index: index + 1,
        seq: sceneNumber
      }))

    reordered = (reordered.length && reordered) || null

    createUpdateDelete(newScriptSequence, reordered)
  }

  const onDragEnd = ({ source, destination }) => {
    if (source.droppableId === 'sequences') {
      if (destination) {
        createScriptsequence(source, destination)
      }
    } else if (source.droppableId === 'scriptsequences') {
      if (!destination) {
        removeScriptsequence(source)
      } else {
        reorderScriptsequences(source, destination)
      }
    }
  }

  if (loading) {
    return children
  } else {
    return <DragDropContext onDragEnd={onDragEnd}>{children}</DragDropContext>
  }
}

const mapStateToProps = (state, ownProps) => ({
  sequences: getSequenceList(state, ownProps),
  loading: getLoading(state)
})

const mapDispatchToProps = (dispatch) => ({
  deleteScriptsequence: (id) => dispatch(deleteScriptsequence(id)),
  bulkupdateScriptsequences: (scriptsequences) =>
    dispatch(bulkupdateScriptsequence(scriptsequences)),
  createUpdateDelete: (cr, up, de) =>
    dispatch(createUpdateDeleteScriptsequences(cr, up, de))
})

DragContext.propTypes = {
  children: PropTypes.node,
  scriptsequences: PropTypes.array,
  createUpdateDelete: PropTypes.func
}

export default connect(mapStateToProps, mapDispatchToProps)(toJS(DragContext))
