import React from 'react'
import { connect } from 'react-redux'
import { toJS } from '../../../utils/immutableToJs.jsx'
import Profile from '../../profiles/components/Profile.jsx'
import { getSessioncontentById } from '../selectors'
import LikesBox from './LikesBox.jsx'

const ProfileSessioncontentGridItem = React.memo(
  ({ profilesessioncontent: { id, profile } }) => {
    return (
      <Profile id={profile}>
        <LikesBox id={id} />
      </Profile>
    )
  }
)

const mapStateToProps = (state, ownprops) => ({
  profilesessioncontent: getSessioncontentById(state, ownprops)
})

export default connect(mapStateToProps)(toJS(ProfileSessioncontentGridItem))
