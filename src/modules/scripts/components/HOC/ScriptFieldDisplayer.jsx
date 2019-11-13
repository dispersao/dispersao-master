import React, { useState } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { updateScript } from '../../actions'

import {
  Typography
} from '@material-ui/core'

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component'
}

const ScriptFieldUpdateComp = (WrappedComponent, field) => {
  
  const ScriptFieldUpdate = (props) => {
    const { save, synching, value } = props

    // const [edit, setEdit] = useState(false)
  
    // const clickTextHandler = () => {
    //   if (!synching) {
    //     // setEdit(true)
    //   }
    // }

    const saveField = (val) => {
      if (val !== value.toString() && !synching) {
        save(val)
      }
      // setEdit(false)
    }

    return (
      <>
        {/* { edit &&  */}
          <WrappedComponent {...props} save={saveField}/>
        {/* } */}
        {/* {!edit &&
          <Typography 
            color={synching ? 'textSecondary' : 'initial'}
            variant="h5" 
            component="div"
            onClick={clickTextHandler}>
            {value}
          </Typography>
        } */}
      </>
    )
  } 
  ScriptFieldUpdate.propTypes = {
    field: PropTypes.string,
    save: PropTypes.func,
    synching: PropTypes.bool,
    value: PropTypes.any
  }

  ScriptFieldUpdate.displayName = `ScriptFieldUpdate(${getDisplayName(WrappedComponent)})`

  const mapDispatchToProps = (dispatch, ownProps) => {
    return {
      save: (value) => dispatch(updateScript({
        id: ownProps.id,
        [field]: value
      })),
      value: ownProps[field]
    }
  }

  return connect(
    null,
    mapDispatchToProps
  )(ScriptFieldUpdate)
}

export default ScriptFieldUpdateComp
