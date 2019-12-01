import React from 'react'
import PropTypes from 'prop-types'
import padStart from 'lodash/padStart'

import Typography from '@material-ui/core/Typography'

const ScriptTime = ({ field, value }) => {

  const formatTime = (val) => {
    return toHHMMSS(val.toString())
  }

  return (
    <div>
      <Typography color='textPrimary'>{formatTime(value) }</Typography>
      <Typography color='textSecondary'>{field}</Typography>
    </div>
  )
}

ScriptTime.propTypes = {
  field: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired
}

const toHHMMSS = (value) => {
  const sec_num = parseInt(value, 10) // don't forget the second param
  const hours   = Math.floor(sec_num / 3600)
  const minutes = Math.floor((sec_num - (hours * 3600)) / 60)
  const seconds = sec_num - (hours * 3600) - (minutes * 60)

  if (!hours) {
    return `${padStart(minutes.toString(), 2, '0')}:${padStart(seconds.toString(), 2, '0')}`
  } else {
    return `${padStart(hours.toString(), 2, '0')}:${padStart(minutes.toString(), 2, '0')}:${padStart(seconds.toString(), 2, '0')}`
  }
}

export default ScriptTime
