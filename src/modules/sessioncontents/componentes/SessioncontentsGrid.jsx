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

const SessioncontentsGrid = ({ postSessioncontents, profileSessioncontents }) => {
  const classes = useStyles()

  return (
    <div>
      <div className={classes.sessioncontentHeaderContainer}>
      <Typography variant="h4" component="h2">
        Session content
      </Typography>
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
  profileSessioncontents: PropTypes.arrayOf(PropTypes.number)
}

const mapStateToProps = (state, ownprops) => ({
  postSessioncontents: getCurrentScriptPostSessioncontentsIds(state, ownprops),
  profileSessioncontents : getCurrentScriptProfileSessioncontentsIds(state, ownprops)
})

export default connect(mapStateToProps, null)(toJS(SessioncontentsGrid))
