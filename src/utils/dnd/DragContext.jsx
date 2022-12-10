import React from 'react'
import PropTypes from 'prop-types'
import { DragDropContext } from 'react-beautiful-dnd'
import { connect } from 'react-redux'
import {
  deleteScriptsequence,
  bulkupdateScriptsequence,
  createUpdateDeleteScriptsequences
} from '../../modules/scriptsequences/actions'
import { getCurrentScript } from '../../modules/scripts/selectors'
import { getSequenceList } from '../../modules/sequences/selectors'
import { toJS } from '../immutableToJs.jsx'
import { getCurrentScriptScriptsequences } from '../../modules/scriptsequences/selectors'
import { useEffect } from 'react'

const DragContext = React.memo(({
  children,
  script,
  createUpdateDelete,
  orderedScriptsequences = [],
  sequences = []
}) => {
  console.log('DragContext', orderedScriptsequences, sequences, script)
  useEffect(() => {
    console.log('orderedScriptsequences changed')
  }, [orderedScriptsequences])

  const reorderScriptsequences = (source, destination) => {
    const moveForward = source.index > destination.index
    const movedScriptSequence = orderedScriptsequences[source.index]
    const iniSlice = moveForward ? destination.index : source.index + 1
    const endSlice = moveForward ? source.index : destination.index + 1
    let reordered = orderedScriptsequences.slice(iniSlice, endSlice)
    const step = moveForward ? 1 : -1
    reordered = reordered.map(id => ({
      id,
      index: orderedScriptsequences.indexOf(id) + step
    }))
    reordered.push({
      id: movedScriptSequence,
      index: destination.index
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
      .map(id => ({
        id,
        index: orderedScriptsequences.indexOf(id) - 1
      }))

    reordered = (reordered.length && reordered) || null

    createUpdateDelete(null, reordered, removedScriptsequence)
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
      .map(id => ({
        id,
        index: orderedScriptsequences.indexOf(id) + 1
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
  return <DragDropContext onDragEnd={onDragEnd}>{children}</DragDropContext>
})

const mapStateToProps = (state, ownProps) => ({
  script: getCurrentScript(state),
  sequences: getSequenceList(state, ownProps),
  orderedScriptsequences: getCurrentScriptScriptsequences(state, ownProps)
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
  orderedScriptsequences: PropTypes.array,
  createUpdateDelete: PropTypes.func
}

export default connect(mapStateToProps, mapDispatchToProps)(toJS(DragContext))
