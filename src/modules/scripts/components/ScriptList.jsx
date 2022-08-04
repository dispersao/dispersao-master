import React from 'react'
import PropTypes from 'prop-types'
import { toJS } from '../../../utils/immutableToJs.jsx'
import { connect } from 'react-redux'
import { getScriptList } from '../selectors'

import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List'

import ScriptListItem from './ScriptListItem.jsx'
import { Redirect } from 'react-router-dom'
import { Container } from '@material-ui/core'

const ScriptList = ({ scripts }) => {
  return (
    <>
      <Typography variant="h6">Scripts</Typography>
      <Container maxWidth="sm">
        {scripts.length && (
          <List>
            {scripts.map((script, key) => (
              <ScriptListItem key={key} {...script} />
            ))}
          </List>
        )}
      </Container>
    </>
  )
  /*} else {
    return <Redirect to="/scripts/new" />
  }*/
}

ScriptList.propTypes = {
  scripts: PropTypes.array.isRequired
}

const mapStateToProps = (state, ownProps) => ({
  scripts: getScriptList(state, ownProps)
})

export default connect(mapStateToProps, null)(toJS(ScriptList))
