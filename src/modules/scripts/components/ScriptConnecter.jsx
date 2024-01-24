import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { connectScript } from '../actions'
import SettingsEthernetIcon from '@material-ui/icons/SettingsEthernet'
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked'
import { Typography, Button } from '@material-ui/core'

import useStyles from './styles'
import {
  getCurrentScriptId,
  getCurrentScriptIdFieldByFieldname
} from '../selectors'

const ScriptConnecter = ({ connected, connect, id }) => {
  const classes = useStyles()
  const onClick = () => {
    connect(parseInt(id))
  }
  const classToApply = connected === undefined ? 'connect' : 'retryConnect'

  if (!connected || connected === 'failed') {
    return (
      <Button  variant="contained" onClick={onClick} className={classes[`${classToApply}Button`]}>
        <SettingsEthernetIcon />
      </Button>
    )
  } else {
    return (
      <RadioButtonCheckedIcon className={classes[`${connected}Text`]} />
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
  connected: getCurrentScriptIdFieldByFieldname(state, {
    ...ownProps,
    field: 'connected'
  })
})

const mapDispatchToProps = (dispatch) => ({
  connect: (id) => dispatch(connectScript({ id }))
})

export default connect(mapStateToProps, mapDispatchToProps)(ScriptConnecter)
