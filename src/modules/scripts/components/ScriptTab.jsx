import React from 'react'
import PropTypes from 'prop-types'
import Box from '@material-ui/core/Box'

const ScriptTab = ({ children, value, index }) => {
  return (
    <>
      {value === index && 
        <Box p={3}>
          {children}
        </Box>
      }
    </>
  )
}

ScriptTab.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
}

export default ScriptTab
