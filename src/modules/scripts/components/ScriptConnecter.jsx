import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { connectScript } from '../actions'
import { 
  Typography, 
  Button 
} from '@material-ui/core'

import useStyles from './styles'
import { getCurrentScriptId, getCurrentScriptIdFieldByFieldname } from '../selectors'

const ScriptConnecter = ({ connected, connect, id }) => {
  const classes = useStyles()
  const onClick = () => {
    connect(parseInt(id))
  }

  const text = !connected ? 'connect' : 're-try connect'

  if (!connected || connected === 'failed') {
    return (
      <Button 
        onClick={onClick}
        className={classes.connectButton}>
        {text}
      </Button>
    )
  } else {

    return (
      <Typography 
        className={classes[`${connected}Text`]}>
        {connected}
      </Typography>
    )
  }
}

ScriptConnecter.propTypes = {
  connected: PropTypes.string,
  connect: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired
}

const mapStateToProps = (state, ownProps) => ({
  id: getCurrentScriptId(state),
  connected: getCurrentScriptIdFieldByFieldname(state, { ...ownProps, field: 'connected'})
})

const mapDispatchToProps = (dispatch) => ({
  connect: (id) => dispatch(connectScript({ id }))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScriptConnecter)
