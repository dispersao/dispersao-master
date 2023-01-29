import React from 'react'
import PropTypes from 'prop-types'

import { toHHMMSS } from '../../../utils/stringUtils'
import useStyles from './styles'

import Typography from '@material-ui/core/Typography'

const ScriptTime = ({ field, value, classname = '' }) => {
  const classes = useStyles()

  const formattedValue = toHHMMSS(value.toString())

  return (
    <div>
      <Typography color="textPrimary" className={classname && classes[classname] || '' }>
        {formattedValue}
      </Typography>
      <Typography color="textSecondary">{field}</Typography>
    </div>
  )
}

ScriptTime.propTypes = {
  field: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  classname: PropTypes.string
}

export default ScriptTime
