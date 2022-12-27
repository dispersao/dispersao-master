import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { getCurrentScriptIdFieldByFieldname, getCurrentScriptId } from '../../selectors'

import { updateScript, updateScriptLocalState } from '../../actions'

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component'
}

const ScriptFieldUpdateComp = (WrappedComponent, field, isSynch = true, extraFields = []) => {
  const ScriptFieldUpdate = (props) => {
    const { save, synching, value, id } = props
    const saveField = (val) => {
      if (val !== value.toString() && !synching) {
        save(id, val)
      }
    }
    return <WrappedComponent {...props} save={saveField} />
  }

  ScriptFieldUpdate.propTypes = {
    save: PropTypes.func,
    synching: PropTypes.bool,
    value: PropTypes.any,
    isSynch: PropTypes.bool,
    id: PropTypes.string
  }

  ScriptFieldUpdate.displayName = `ScriptFieldUpdate(${getDisplayName(
    WrappedComponent
  )})`

  const mapStateToProps = (state, ownProps) => ({
    value: getCurrentScriptIdFieldByFieldname(state, {...ownProps, field }),
    synching: getCurrentScriptIdFieldByFieldname(state, { ...ownProps, field: 'synching' }) || false,
    id: getCurrentScriptId(state),
    ...(extraFields.reduce((acc, curr) => ({
      ...acc,
      [curr]: getCurrentScriptIdFieldByFieldname(state, { ...ownProps, field: curr }),
    }), {}))
  })

  const mapDispatchToProps = (dispatch, ownProps) => {
    return {
      save: (id, value) => {
        const action = isSynch ? updateScript : updateScriptLocalState
        dispatch(
          action({
            id,
            [field]: value
          })
        )
      }
    }
  }

  return connect(mapStateToProps, mapDispatchToProps)(ScriptFieldUpdate)
}

export default ScriptFieldUpdateComp
