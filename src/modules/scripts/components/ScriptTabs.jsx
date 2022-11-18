import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { Paper, Tabs, Tab, Divider } from '@material-ui/core'

import useStyles from './styles'

import ScriptTab from './ScriptTab.jsx'
import UnplayedSequences from '../../sequences/components/UnplayedSequences.jsx'
import ScriptSequencesGrid from '../../scriptsequences/components/ScriptSequencesGrid.jsx'

import UnpublishedPosts from '../../posts/components/UnpublishedPosts.jsx'
import SessioncontentsGrid from '../../sessioncontents/componentes/SessioncontentsGrid.jsx'

import DragContext from '../../../utils/dnd/DragContext.jsx'

const ScriptTabs = ({ script }) => {
  const [value, setValue] = useState(0)

  const handleChange = (evt, val) => {
    setValue(val)
  }

  const { id, sessioncontents, scriptsequences } = script


  const classes = useStyles()

  return (
    <Paper square className={classes.root}>
      <Tabs
        value={value}
        indicatorColor="primary"
        textColor="primary"
        onChange={handleChange}
      >
        <Tab label="Sequences" />
        <Tab label="Posts & Comments" />
      </Tabs>
      <ScriptTab index={0} value={value}>
        <DragContext script={id}>
          <ScriptSequencesGrid scriptsequences={scriptsequences} />
          <Divider />
          <UnplayedSequences script={id} scriptsequences={scriptsequences} />
        </DragContext>
      </ScriptTab>
      <ScriptTab index={1} value={value}>
        <UnpublishedPosts script={id} sessioncontents={sessioncontents} />
        <Divider />
        <SessioncontentsGrid sessioncontents={sessioncontents} />
      </ScriptTab>
    </Paper>
  )
}

ScriptTabs.propTypes = {
  script: PropTypes.object
}

export default ScriptTabs
