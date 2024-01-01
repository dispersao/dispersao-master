import { Box, Button, Divider, Drawer, Icon } from '@material-ui/core'
import React from 'react'
import UnpublishedPosts from '../../posts/components/UnpublishedPosts.jsx'
import SessioncontentsGrid from '../../sessioncontents/componentes/SessioncontentsGrid.jsx'
import useStyles from './styles/index.js'
import CloseIcon from '@material-ui/icons/Close'

const AppDrawer = ({ isOpened, onClose }) => {
  const classes = useStyles()

  return (
    <Drawer anchor="right" open={isOpened} onClose={onClose}>
      <Box className={classes.drawer}>
        <Button className={classes.drawerClose} onClick={onClose}>
          <CloseIcon />
        </Button>
        <SessioncontentsGrid />
        <Divider className={classes.divider} />
        <UnpublishedPosts />
      </Box>
    </Drawer>
  )
}
export default AppDrawer
