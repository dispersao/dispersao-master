import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { toJS } from '../../../utils/immutableToJs.jsx'

import { getCurrentScriptPostSessioncontentsIds } from '../selectors'
import SessioncontentGridItem from './SessioncontentGridItem.jsx'

import useStyles from './styles/'

import { GridList, Typography } from '@material-ui/core'

const SessioncontentsGrid = ({ postSessioncontents }) => {
  const classes = useStyles()

  return (
    <div>
      <Typography variant="h4" component="h2">
        Session content
      </Typography>
      <div className={classes.root}>
        <GridList cellHeight={180}>
          {postSessioncontents.map((sescon, key) => (
            <SessioncontentGridItem key={key} id={sescon} />
          ))}
        </GridList>
      </div>
    </div>
  )
}

SessioncontentsGrid.propTypes = {
  postSessioncontents: PropTypes.arrayOf(PropTypes.number)
}

const mapStateToProps = (state, ownprops) => ({
  postSessioncontents: getCurrentScriptPostSessioncontentsIds(state, {
    ...ownprops
  })
})

export default connect(mapStateToProps, null)(toJS(SessioncontentsGrid))
