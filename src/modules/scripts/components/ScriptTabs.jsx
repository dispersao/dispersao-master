import React, { useState } from 'react'

import { Paper, Tabs, Tab, Divider } from '@material-ui/core'

import useStyles from './styles'

import UnpublishedPosts from '../../posts/components/UnpublishedPosts.jsx'
import ScriptTab from './ScriptTab.jsx'
import Sequences from '../../sequences/components/Sequences.jsx'
import Timeline from '../../scriptsequences/components/Timeline.jsx'

import SessioncontentsGrid from '../../sessioncontents/componentes/SessioncontentsGrid.jsx'
import DNDManager from '../../../utils/dnd/DNDManager.jsx'

const ScriptTabs = () => {
  const [value, setValue] = useState(0)

  const handleChange = (evt, val) => {
    setValue(val)
  }

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
        <DNDManager>
          <Timeline />
          <Divider />
          <Sequences />
        </DNDManager>
      </ScriptTab>
      <ScriptTab index={1} value={value}>
        <UnpublishedPosts />
        <Divider />
        <SessioncontentsGrid />
      </ScriptTab>
    </Paper>
  )
}

export default ScriptTabs
