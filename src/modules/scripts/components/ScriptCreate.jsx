import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { toJS } from '../../../utils/immutableToJs.jsx'

import clsx from 'clsx'

import {
  Container,
  Button,
  FormControl,
  InputLabel,
  Input,
  List,
  ListItem
} from '@material-ui/core'

import { makeStyles } from '@material-ui/core/styles'
import { createScript } from '../actions'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    margin: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: 250,
  },
}))

export const ScriptCreate = ({ createSession }) => {
  const classes = useStyles()

  const [name, setName] = useState('')
  const [averagetime, setAverageTime] = useState('')

  

  const handleCreateSession = () => {
    createSession({
      name,
      averagetime
    })
  }

  return (
    <Container fixed>
      <List>
        <ListItem>
          <FormControl>
            <InputLabel
              htmlFor="name">
              Name
            </InputLabel>
            <Input id="name"
              className={clsx(classes.margin, classes.textField)}
              aria-describedby="script name"
              onChange={evt => setName(evt.target.value)} />
          </FormControl>
        </ListItem>
        <ListItem>
          <FormControl>
            <InputLabel 
              htmlFor="avgSize">
              Duration in Minutes (aprox)
            </InputLabel>
            <Input
              id="avgSize"
              aria-describedby="script duration"
              className={clsx(classes.margin, classes.textField)}
              onChange={evt => setAverageTime(evt.target.value)} 
            />
          </FormControl>
        </ListItem>
      </List>
      <Button
        variant="contained"
        onClick={handleCreateSession}>
        create session
      </Button>
    </Container>
  )
}

ScriptCreate.propTypes = {
  createSession: PropTypes.func.isRequired
}

const mapDispatchToProps = (dispatch) => ({
  createSession: (options) => {
    dispatch(createScript(options))
  }
})

export default connect(
  null,
  mapDispatchToProps
)(toJS(ScriptCreate))
