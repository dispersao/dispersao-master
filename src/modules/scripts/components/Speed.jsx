import React from 'react'
import PropTypes from 'prop-types'

import {
  Select,
  MenuItem
} from '@material-ui/core'

const Speed = ({ value, onSelect, className }) => {
  return (
    <Select 
      id="speed"
      aria-describedby="script speed"
      className={className}
      onChange={evt => onSelect(evt.target.value)}
      value={value}>
      <MenuItem value="">
        <em>None</em>
      </MenuItem>
      <MenuItem 
        value='normal'>
          normal (1x)
      </MenuItem>
      <MenuItem 
        value='ff'>
          fast-forward (2x)
      </MenuItem>
      <MenuItem 
        value='sff'>
          super-fast-forward (4x)
      </MenuItem>
    </Select>
  )
}

Speed.propTypes = {
  value: PropTypes.string,
  className: PropTypes.string,
  onSelect: PropTypes.func
}

export default Speed

