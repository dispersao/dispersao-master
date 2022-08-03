import React from 'react'
import PropTypes from 'prop-types'
import MenuItem from '@material-ui/core/MenuItem'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'

const MultiFilter = ({ name, list, selected, onChange }) => {
  return (
    <FormControl>
      <InputLabel id={name}>{name}</InputLabel>
      <Select
        labelId={name}
        id={name}
        multiple
        value={selected}
        onChange={onChange}
      >
        {list.map((el, idx) => (
          <MenuItem key={idx} value={el.id}>
            {el.text}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

MultiFilter.propTypes = {
  name: PropTypes.string.isRequired,
  list: PropTypes.array.isRequired,
  selected: PropTypes.array,
  onChange: PropTypes.func,
  
}

export default MultiFilter
