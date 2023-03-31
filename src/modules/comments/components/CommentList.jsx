import { GridList } from '@material-ui/core'
import React from 'react'
import useStyles from './styles/index.js'

const CommentList = ({ children }) => {
  const classes = useStyles()
  return <GridList className={classes.commentContainer}>{children}</GridList>
}

export default CommentList
