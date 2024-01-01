import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { toJS } from '../../../utils/immutableToJs.jsx'

import { getCurrentScriptPostSessioncontentsIds, getCurrentScriptProfileSessioncontentsIds } from '../selectors'
import SessioncontentGridItem from './SessioncontentGridItem.jsx'

import useStyles from './styles/'

import { GridList, Typography } from '@material-ui/core'
import SessioncontentStats from './SessioncontentStats.jsx'
import ProfileSessioncontentGridItem from './ProfileSessioncontentGridItem.jsx'
import { getCurrentScriptIdFieldByFieldname } from '../../scripts/selectors.js'

const SessioncontentsGrid = ({ postSessioncontents, profileSessioncontents, token }) => {
  const classes = useStyles()

  return (
    <div>
      <div className={classes.sessioncontentHeaderContainer}>
      <Typography variant="h5" component="h5">
        Session content
      </Typography>
      {token && (
        <Typography variant='caption' className={classes.startedText}>TOKEN {token}</Typography>
      )}
      <SessioncontentStats />
      </div>
      
      <div className={classes.root}>
        <GridList className={classes.profilesContainer}>
          {profileSessioncontents.map((sescon) => (
            <ProfileSessioncontentGridItem key={sescon} id={sescon} />
          ))}
        </GridList>
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
  postSessioncontents: PropTypes.arrayOf(PropTypes.number),
  profileSessioncontents: PropTypes.arrayOf(PropTypes.number),
  token: PropTypes.string
}

const mapStateToProps = (state, ownprops) => ({
  postSessioncontents: getCurrentScriptPostSessioncontentsIds(state, ownprops),
  profileSessioncontents : getCurrentScriptProfileSessioncontentsIds(state, ownprops),
  token: getCurrentScriptIdFieldByFieldname(state, { field: 'token'})
})

export default connect(mapStateToProps, null)(toJS(SessioncontentsGrid))
