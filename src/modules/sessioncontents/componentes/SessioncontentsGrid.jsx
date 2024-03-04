import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { toJS } from '../../../utils/immutableToJs.jsx'

import {
  getCurrentScriptPostSessioncontentsIds,
  getCurrentScriptProfileSessioncontentsIds
} from '../selectors'
import SessioncontentGridItem from './SessioncontentGridItem.jsx'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

import useStyles from './styles/'

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  GridList,
  Typography
} from '@material-ui/core'
import SessioncontentStats from './SessioncontentStats.jsx'
import ProfileSessioncontentGridItem from './ProfileSessioncontentGridItem.jsx'
import { getCurrentScriptIdFieldByFieldname } from '../../scripts/selectors.js'

const SessioncontentsGrid = ({
  postSessioncontents,
  profileSessioncontents,
  token
}) => {
  const classes = useStyles()

  return (
    <div> 
      <div className={classes.sessioncontentHeaderContainer}>
        <Typography variant="h5" component="h5">
          Session content
        </Typography>
        {token && (
          <Typography variant="caption" className={classes.startedText}>
            TOKEN {token}
          </Typography>
        )}
        <SessioncontentStats />
      </div>

      <div className={classes.tabsRoot}>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.heading}>Profiles</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <GridList className={classes.profilesContainer}>
              {profileSessioncontents.map((sescon) => (
                <ProfileSessioncontentGridItem key={sescon} id={sescon} />
              ))}
            </GridList>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            id="Publishedcontent-controler"
          >
            <Typography className={classes.heading}>
              Published Content
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <GridList cellHeight={180}>
              {postSessioncontents.map((sescon, key) => (
                <SessioncontentGridItem key={key} id={sescon} />
              ))}
            </GridList>
          </AccordionDetails>
        </Accordion>
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
  profileSessioncontents: getCurrentScriptProfileSessioncontentsIds(
    state,
    ownprops
  ),
  token: getCurrentScriptIdFieldByFieldname(state, { field: 'token' })
})

export default connect(mapStateToProps, null)(toJS(SessioncontentsGrid))
