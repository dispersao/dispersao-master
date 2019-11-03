import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { toJS } from '../../../utils/immutableToJs.jsx'

import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'

import { createScript } from '../actions'

export const ScriptCreate = ({ createSession }) => {
  return (
    <Container fixed>
      <Button
        variant="contained"
        onClick={createSession}>
          create session
      </Button>
    </Container>
  )
}

ScriptCreate.propTypes = {
  createSession: PropTypes.func.isRequired
}

const mapDispatchToProps = (dispatch) => ({
  createSession: () => dispatch(createScript()),
}) 

export default connect(
  null,
  mapDispatchToProps
)(toJS(ScriptCreate))
