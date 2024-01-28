import React from 'react'
import PropTypes from 'prop-types'
import useStyles from './styles'


const Progressbar = React.memo(({ value, direction, enabled }) => {
  const className = direction === 'r-l' ? 'progressDivRL' : 'progressDivLR'
  const classes = useStyles()
  
  if (enabled) {
    return (
      <div
        className={classes[className]}
        style={{ width: `${value}%` }}
      />
    )
  } else return (
    <>
    </>
  )
})

Progressbar.propTypes = {
  value: PropTypes.number,
  direction: PropTypes.string,
  enabled: PropTypes.bool
}

export default Progressbar
