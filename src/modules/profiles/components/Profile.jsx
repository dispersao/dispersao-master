import { Avatar, Typography } from '@material-ui/core'
import React from 'react'
import { connect } from 'react-redux'
import { toJS } from '../../../utils/immutableToJs.jsx'
import { getApiUrl } from '../../config/selectors.js'
import Contentcreator from '../../contentcreators/components/Contentcreator.jsx'
import { getProfileContentcreatorByProfileId } from '../selectors'
import useStyles from './styles'
export const Profile = ({
  contentcreator,
  mediaUrl,
  children
}) => {
  const classes = useStyles()
  return (
    <div className={classes.profile}>
      <Contentcreator {...contentcreator} mediaUrl={mediaUrl} size="medium">
        {children}
      </Contentcreator>
    </div>
  )
}

const mapStateToProps = (state, ownprops) => ({
  contentcreator: getProfileContentcreatorByProfileId(state, ownprops),
  mediaUrl: getApiUrl(state)
})

export default connect(mapStateToProps)(toJS(Profile))
