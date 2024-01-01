import React, { useState } from 'react'

import { Paper, Divider, Button } from '@material-ui/core'

import useStyles from './styles'

import Sequences from '../../sequences/components/Sequences.jsx'
import Timeline from '../../scriptsequences/components/Timeline.jsx'

import DNDManager from '../../../utils/dnd/DNDManager.jsx'
import PhoneIphoneIcon from '@material-ui/icons/PhoneIphone'
import AppDrawer from './AppDrawer.jsx'

const ScriptTabs = () => {
  const [drawerOpened, setDrawerOpened] = useState(false)

  const openDrawer = () => {
    setDrawerOpened(true)
  }

  const classes = useStyles()

  return (
    <Paper square className={classes.root}>
      <DNDManager>
        <Timeline
          headerChildren={
            <Button variant="outlined" color="secondary" onClick={openDrawer}>
              <PhoneIphoneIcon />
            </Button>
          }
        />
        <Divider className={classes.divider} />
        <Sequences />
        <AppDrawer
          isOpened={drawerOpened}
          onClose={() => setDrawerOpened(false)}
        />
      </DNDManager>
    </Paper>
  )
}

export default ScriptTabs
