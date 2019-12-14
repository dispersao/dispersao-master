import React from 'react'
import PropTypes from 'prop-types'

import { toHHMMSS } from '../../../utils/stringUtils'

import Typography from '@material-ui/core/Typography'

const ScriptTime = ({ field, value }) => {

  const formattedValue = toHHMMSS(value.toString())

  return (
    <div>
      <Typography color='textPrimary'>{formattedValue}</Typography>
      <Typography color='textSecondary'>{field}</Typography>
    </div>
  )
}

ScriptTime.propTypes = {
  field: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired
}

export default ScriptTime
