import React from 'react'
import PropTypes from 'prop-types'

import {
  MenuItem,
  InputLabel,
  FormControl,
  Select,
  RadioGroup,
  FormControlLabel,
  Radio
} from '@material-ui/core'

import useStyles from '../styles'

const MultiFilter = ({
  name,
  field,
  list,
  radioList = ['and', 'or', 'exclude'],
  selected,
  selectedRadio,
  onSelectChange,
  onRadioChange
}) => {
  const classes = useStyles()
  return (
    <>
      <FormControl className={classes.formControl}>
        <InputLabel id={name}>{name}</InputLabel>
        <Select
          labelId={name}
          id={name}
          multiple
          value={selected}
          onChange={(evt) => onSelectChange(evt.target.value)}
        >
          {list.map((el, idx) => (
            <MenuItem key={idx} value={el.id}>
              {el[field]}
            </MenuItem>
          ))}
        </Select>
        <RadioGroup
          name="options"
          value={selectedRadio}
          onChange={(evt) => onRadioChange(evt.target.value)}
        >
          {radioList.map((option, idx) => (
            <FormControlLabel
              key={idx}
              value={option}
              control={<Radio />}
              label={option}
            />
          ))}
        </RadioGroup>
      </FormControl>
    </>
  )
}

MultiFilter.propTypes = {
  name: PropTypes.string.isRequired,
  field: PropTypes.string.isRequired,
  list: PropTypes.array.isRequired,
  radioList: PropTypes.array.isRequired,
  selected: PropTypes.array,
  selectedRadio: PropTypes.string,
  onChange: PropTypes.func,
  onSelectChange: PropTypes.func
}

export default MultiFilter
