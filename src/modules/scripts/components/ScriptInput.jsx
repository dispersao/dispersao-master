import React from 'react'
import PropTypes from 'prop-types'

import useStyles from './styles'

import {
  TextField,
  ClickAwayListener,
} from '@material-ui/core'

const ScriptInput = ({ value, save, field }) => {
  const classes = useStyles()

  let inputRef

  const saveValue = () => {
    if (inputRef.value !== name) {
      save(inputRef.value)
    }
  }

  return (
    <ClickAwayListener onClickAway={saveValue}>
      <TextField
        autoFocus
        id={`standard-required-${field}`}
        label={field}
        className={classes.textField}
        margin="normal"
        defaultValue={value}
        inputRef={ref => inputRef = ref}
      />
    </ClickAwayListener>
      
  )
}

ScriptInput.propTypes = {
  value: PropTypes.any,
  save: PropTypes.func,
  field: PropTypes.string
}

export default ScriptInput
