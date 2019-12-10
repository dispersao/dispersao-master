import React from 'react'
import PropTypes from 'prop-types'

import {
  Select,
  MenuItem,
  InputLabel
} from '@material-ui/core'



const Speed = ({ value, onSelect, className, disabled }) => {
  const val = value || 1
  return (
    <>
      <InputLabel 
        htmlFor="speed">
        Speed
      </InputLabel>
      <Select 
        id="speed"
        aria-describedby="script speed"
        className={className}
        label='speed'
        onChange={evt => onSelect(evt.target.value)}
        disabled={disabled}
        value={val}>
        <MenuItem 
          value='1'>
            normal (1x)
        </MenuItem>
        <MenuItem 
          value='2'>
            ff (2x)
        </MenuItem>
        <MenuItem 
          value='4'>
            ff (4x)
        </MenuItem>
        <MenuItem 
          value='8'>
            ff (8x)
        </MenuItem>
      </Select>
    </>
  )
}

Speed.propTypes = {
  value: PropTypes.string,
  className: PropTypes.string,
  onSelect: PropTypes.func,
  disabled: PropTypes.bool
}

export default Speed

