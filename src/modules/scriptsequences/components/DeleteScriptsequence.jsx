import React from 'react'
import useStyles from './styles'
import PropTypes from 'prop-types'
import DeleteIcon from '@material-ui/icons/Delete'

import { IconButton } from '@material-ui/core'
import WithContextProps from '../../../utils/dnd/HOC/WithContextProps.jsx'

const DeleteScriptsequence = React.memo(({ id, onDelete }) => {
  const classes = useStyles()

  return (
    <IconButton
      className={classes.deleteScriptSequence}
      size="small"
      onClick={() => onDelete(id)}
    >
      <DeleteIcon />
    </IconButton>
  )
})

DeleteScriptsequence.propTypes = {
  id: PropTypes.number,
  onDelete: PropTypes.func
}

export default WithContextProps(DeleteScriptsequence, {
  onDelete: 'onScriptsequenceRemoved'
})
