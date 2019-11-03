import React from 'react'
import PropTypes from 'prop-types'
import { toJS } from '../../../utils/immutableToJs.jsx'
import { connect } from 'react-redux'

import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List'

import ScriptListItem from './ScriptListItem.jsx'

const ScriptList = ({ scripts }) => {
  return (
    <Grid item >
      <Typography variant="h6">
        Scripts
      </Typography>
      <div>
        <List>
          {
            scripts.map((script, key) => (
              <ScriptListItem key={key} {...script}/>
            ))
          }
        </List>
      </div>
    </Grid>
  )
}

ScriptList.propTypes = {
  scripts: PropTypes.array.isRequired
}

export default connect(
  null,
  null
)(toJS(ScriptList))
