import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { connectScript } from '../actions'
import { 
  Typography, 
  Button 
} from '@material-ui/core'

import useStyles from './styles'

const ScriptConnecter = ({ connected, connect, id }) => {
  const classes = useStyles()
  const onClick = () => {
    connect(id)
  }

  if (!connected) {
    return (
      <Button 
        onClick={onClick}
        className={classes.connectButton}>
        connect
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
  id: PropTypes.number.isRequired
}

const mapDispatchToProps = (dispatch) => ({
  connect: (id) => dispatch(connectScript({ id }))
})

export default connect(
  null,
  mapDispatchToProps
)(ScriptConnecter)
