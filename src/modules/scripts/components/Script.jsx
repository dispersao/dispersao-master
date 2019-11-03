import React from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { toJS } from '../../../utils/immutableToJs.jsx'
import { getScriptById } from '../selectors.js'

import { Redirect } from 'react-router-dom'

const Script = (params) => {
  console.log(params)
  const { id, name, avaragetime, speed } = params.script
  return (
    <>
      { id && 
        <div>{`${id} ${name} ${avaragetime} ${speed}`}</div>
      }
      {!id  && 
         <Redirect to='/scripts' />
      }
    </>
  )
}

Script.propTypes = {
  script: PropTypes.object
}

const mapStateToProps = (state, { match }) => {
  const { id } = match.params
  let script = {}
  if (id ) {
    script = getScriptById(state, { id })
  }
  return {
    script
  }
}

export default connect(
  mapStateToProps,
  null
)(toJS(Script))
