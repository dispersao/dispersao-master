import React, { useState } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { DndContext, MouseSensor, useSensor, useSensors } from '@dnd-kit/core'
import DNDOverlay from './DNDOverlay.jsx'
import { getCurrentScriptId } from '../../modules/scripts/selectors.js'
import {
  getCurrentScripScriptSequencesSentToPlayer,
  getCurrentScriptPlaceholderScriptSequence,
  getCurrentScriptScriptsequencesIds
} from '../../modules/scriptsequences/selectors.js'
import {
  addPlaceholderScriptsequence,
  createUpdateDeleteScriptsequences
} from '../../modules/scriptsequences/actions.js'
import { toJS } from '../immutableToJs.jsx'

const DNDManager = ({
  children,
  script,
  setPlaceholder,
  placeholder,
  createUpdateDelete,
  disabledList = [],
  sortableList = []
}) => {
  const [dragActive, setDragActive] = useState(null)
  useState(null)
  const onDragStart = ({ active }) => {
    setDragActive({ id: active.id, type: active.data.current.type })
  }

  const onDragCancel = () => {
    setDragActive(null)
  }

  const onDragOver = ({ active, over }) => {
    const currentScenario = scenario(active, over)
    const overIndex = getNewPosition(over)

    switch (currentScenario) {
      case 'SEQUENCE_OVER_NOTHING':
        setPlaceholder(null)
        break
      case 'SEQUENCE_OVER_PLACEHOLDER':
        setPlaceholder({
          id: placeholder.id,
          sequence: parseInt(active.id),
          index: overIndex
        })
        break

      case 'SEQUENCE_OVER_SCRIPTSEQUENCE':
        setPlaceholder({
          id: sortableList[sortableList.length - 1] + 1000,
          sequence: parseInt(active.id),
          index: overIndex
        })
        break
    }
  }

  const onDragEnd = ({ active, over }) => {
    const currentScenario = scenario(active, over)
    const overIndex = getNewPosition(over)

    console.log(currentScenario, active, over)
    switch (currentScenario) {
      case 'SEQUENCE_OVER_PLACEHOLDER':
      case 'SEQUENCE_OVER_SCRIPTSEQUENCE':
        if (placeholder) {
          createScriptsequence(placeholder, overIndex)
        }
        break
      case 'SCRIPTSEQUENCE_OVER_SCRIPTSEQUENCE':
        reorderScriptSequences(active.id, overIndex)
        break

      case 'SCRIPTSEQUENCE_OVER_NOTHING':
        removeScriptsequence(active?.id)
        break
    }
    setDragActive(null)
    setPlaceholder(null)
  }

  const createScriptsequence = (placeholder, destination) => {
    const newScriptSequence = {
      script,
      sequence: placeholder.sequence,
      index: destination
    }

    let reordered = sortableList.filter((id) => placeholder.id !== id)
    reordered = reordered.slice(destination).map((id) => ({
      id,
      index: reordered.indexOf(id) + 1
    }))
    reordered = (reordered.length && reordered) || null
    createUpdateDelete(newScriptSequence, reordered)
    console.log(
      `createScriptsequence ${JSON.stringify(
        newScriptSequence
      )} and reordered ${JSON.stringify(reordered)}`
    )
  }

  const reorderScriptSequences = (scriptSequenceToMove, destination) => {
    const origin = sortableList.indexOf(scriptSequenceToMove)
    const moveForward = origin > destination
    const movedScriptSequence = sortableList[origin]
    const iniSlice = moveForward ? destination : origin + 1
    const endSlice = moveForward ? origin : destination + 1
    let reordered = sortableList.slice(iniSlice, endSlice)
    const step = moveForward ? 1 : -1
    reordered = reordered.map((id) => ({
      id,
      index: sortableList.indexOf(id) + step
    }))
    reordered.push({
      id: movedScriptSequence,
      index: destination
    })

    reordered = (reordered.length && reordered) || null
    createUpdateDelete(null, reordered)
    console.log(`reorder ${JSON.stringify(reordered)}`)
  }

  const removeScriptsequence = (scriptSequenceToRemove) => {
    const index = sortableList.indexOf(scriptSequenceToRemove)

    let reordered = sortableList.slice(index + 1).map((id) => ({
      id,
      index: sortableList.indexOf(id) - 1
    }))

    reordered = (reordered.length && reordered) || null
    console.log(
      `remove ${
        scriptSequenceToRemove
      } and reordered ${JSON.stringify(reordered)}`
    )
    createUpdateDelete(null, reordered, scriptSequenceToRemove)
  }

  const sensors = useSensors(useSensor(MouseSensor))

  const scenario = (active, over) => {
    const overId = over?.id
    const isActiveSequence = dragActive.type === 'sequence'
    let overIndex = getNewPosition(over)

    if (!overId) {
      if (isActiveSequence) {
        return 'SEQUENCE_OVER_NOTHING'
      } else if (disabledList.indexOf(active.id) >= 0){
        return 'DISABLED_SCRIPTSEQUENCE'
      } else if (!isActiveSequence) {
        return 'SCRIPTSEQUENCE_OVER_NOTHING'
      }
    } else {
      if (disabledList.indexOf(sortableList[overIndex]) >= 0) {
        return 'OVER_DISABLED_ELEMENT'
      } else if (!isActiveSequence) {
        return 'SCRIPTSEQUENCE_OVER_SCRIPTSEQUENCE'
      } else if (isActiveSequence && !placeholder) {
        return 'SEQUENCE_OVER_SCRIPTSEQUENCE'
      } else if (
        isActiveSequence &&
        parseInt(active.id) === placeholder?.sequence
      ) {
        return 'SEQUENCE_OVER_PLACEHOLDER'
      }
    }
  }

  const getNewPosition = (over) => {
    let overIndex = over?.data.current?.sortable.index
    overIndex =
      overIndex !== undefined && overIndex >= 0
        ? overIndex
        : sortableList.length
    return overIndex
  }

  return (
    <DndContext
      sensors={sensors}
      onDragStart={onDragStart}
      onDragCancel={onDragCancel}
      onDragOver={onDragOver}
      onDragEnd={onDragEnd}
    >
      {children}
      <DNDOverlay id={dragActive?.id} type={dragActive?.type} />
    </DndContext>
  )
}

DNDManager.propTypes = {
  children: PropTypes.node,
  setPlaceholder: PropTypes.func,
  script: PropTypes.string,
  placeholder: PropTypes.object,
  disabledList: PropTypes.number,
  sortableList: PropTypes.array,
  createUpdateDelete: PropTypes.func
}
const mapStateToProps = (state) => ({
  script: getCurrentScriptId(state),
  placeholder: getCurrentScriptPlaceholderScriptSequence(state),
  sortableList: getCurrentScriptScriptsequencesIds(state),
  disabledlist: getCurrentScripScriptSequencesSentToPlayer(state)
})

const mapDispatchToProps = (dispatch) => ({
  setPlaceholder: (scriptsequence) =>
    dispatch(addPlaceholderScriptsequence(scriptsequence)),
  createUpdateDelete: (cr, up, de) =>
    dispatch(createUpdateDeleteScriptsequences(cr, up, de))
})
export default connect(mapStateToProps, mapDispatchToProps)(toJS(DNDManager))
