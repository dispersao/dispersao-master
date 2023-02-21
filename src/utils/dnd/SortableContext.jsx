import React, { createContext } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  deleteScriptsequence,
  bulkupdateScriptsequence,
  createUpdateDeleteScriptsequences
} from '../../modules/scriptsequences/actions'

import { getCurrentScriptId } from '../../modules/scripts/selectors'
import { getSequenceList } from '../../modules/sequences/selectors'
import { toJS } from '../immutableToJs.jsx'
import { getCurrentScriptScriptsequencesIds, getHighestIndexSentToPlay } from '../../modules/scriptsequences/selectors'

export const Context = createContext({
  key: 'value'
})

const SortableContext = ({
  children,
  script,
  createUpdateDelete,
  orderedScriptsequences = [],
  sequences = [],
  lastIndexSentToPlayer = 0
}) => {
  console.log('lastIndexSentToPlayer', lastIndexSentToPlayer)
  const onDropSequence = ({ newIndex, oldIndex, to }) => {
    if (to.id === 'timeline') {
      createScriptsequence(oldIndex, newIndex)
    }
  }

  const onDropScriptsequence = ({ newIndex, oldIndex, to }) => {
    if (to.id === 'timeline' && newIndex > lastIndexSentToPlayer) {
      console.log('newIndex', newIndex, 'oldIndex', oldIndex)
      reorderScriptsequences(oldIndex, newIndex)
    }
  }

  const onScriptsequenceRemoved = (item) => {
    console.log(item)
  }

  const reorderScriptsequences = (source, destination) => {
    const moveForward = source > destination
    const movedScriptSequence = orderedScriptsequences[source]
    const iniSlice = moveForward ? destination : source + 1
    const endSlice = moveForward ? source : destination + 1
    let reordered = orderedScriptsequences.slice(iniSlice, endSlice)
    const step = moveForward ? 1 : -1
    reordered = reordered.map((id) => ({
      id,
      index: orderedScriptsequences.indexOf(id) + step
    }))
    reordered.push({
      id: movedScriptSequence,
      index: destination
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

    let reordered = orderedScriptsequences.slice(source + 1).map((id) => ({
      id,
      index: orderedScriptsequences.indexOf(id) - 1
    }))

    reordered = (reordered.length && reordered) || null

    createUpdateDelete(null, reordered, removedScriptsequence)
  }

  const createScriptsequence = (source, destination) => {
    const sequenceRef = sequences[source]
    const newScriptSequence = {
      script,
      sequence: sequenceRef.id,
      index: destination
    }
    let reordered = orderedScriptsequences.slice(destination).map((id) => ({
      id,
      index: orderedScriptsequences.indexOf(id) + 1
    }))

    reordered = (reordered.length && reordered) || null

    createUpdateDelete(newScriptSequence, reordered)
  }

  return (
    <Context.Provider
      value={{
        onDropSequence,
        onDropScriptsequence,
        onScriptsequenceRemoved
      }}
    >
      {children}
    </Context.Provider>
  )
}

const mapStateToProps = (state, ownProps) => ({
  script: getCurrentScriptId(state),
  sequences: getSequenceList(state, ownProps),
  orderedScriptsequences: getCurrentScriptScriptsequencesIds(state, ownProps),
  lastIndexSentToPlayer: getHighestIndexSentToPlay(state)
})

const mapDispatchToProps = (dispatch) => ({
  deleteScriptsequence: (id) => dispatch(deleteScriptsequence(id)),
  bulkupdateScriptsequences: (scriptsequences) =>
    dispatch(bulkupdateScriptsequence(scriptsequences)),
  createUpdateDelete: (cr, up, de) =>
    dispatch(createUpdateDeleteScriptsequences(cr, up, de))
})

SortableContext.propTypes = {
  children: PropTypes.node,
  orderedScriptsequences: PropTypes.array,
  createUpdateDelete: PropTypes.func,
  lastIndexSentToPlayer: PropTypes.number
}

export default connect(mapStateToProps, mapDispatchToProps)(toJS(SortableContext))
