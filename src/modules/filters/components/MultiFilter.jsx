import React, { useRef, useState, useEffect } from 'react'
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

import useStyles from './styles/'

const MultiFilter = ({
  name,
  list,
  selected,
  selectedRadio,
  onChange,
  field,
  radioList = ['and', 'or', 'exclude']
}) => {
  const classes = useStyles()
  const selectRef = useRef()
  const radioRef = useRef()

  const [selectedState, setSelected] = useState(selected)
  const [selectedRadioState, setSelectedRadio] = useState(selectedRadio)

  const onSelectChange = (evt) => {
    setSelected(evt.target.value)
    //console.log(selectRef, radioRef)
    //onChangeSelect(evt.target.value)
  }

  const onRadioChange = (evt) => {
    setSelectedRadio(evt.target.value)
    //setRadio(evt.target.value)
    //onChangeRadio(evt.target.value)
  }

  useEffect(() => {
    onChange(selectedState, selectedRadioState)
  }, [selectedState, selectedRadioState])

  return (
    <FormControl className={classes.formControl}>
      <InputLabel id={name}>{name}</InputLabel>
      <Select
        labelId={name}
        id={name}
        multiple
        value={selectedState}
        onChange={onSelectChange}
        inputRef={selectRef}
      >
        {list.map((el, idx) => (
          <MenuItem key={idx} value={el.id}>
            {el[field]}
          </MenuItem>
        ))}
      </Select>
      <RadioGroup
        name="options"
        value={selectedRadioState}
        onChange={onRadioChange}
        ref={radioRef}
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
  )
}

MultiFilter.propTypes = {
  name: PropTypes.string.isRequired,
  list: PropTypes.array.isRequired,
  selected: PropTypes.array,
  onChange: PropTypes.func,
  field: PropTypes.string.isRequired,
  options: PropTypes.array
}

export default MultiFilter
