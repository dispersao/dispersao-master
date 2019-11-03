import React from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { toJS } from '../../../utils/immutableToJs.jsx'

const Script = ({ id }) => {
  return (
    <>
      { id }
    </>
  )
} 

Script.propTypes = {
  id: PropTypes.number.isRequired
}

export default connect(
  null,
  null
)(toJS(Script))
