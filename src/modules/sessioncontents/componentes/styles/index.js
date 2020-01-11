import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => {
  return {
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper
    },
    pending: {
      backgroundColor: 'red'
    },
    published: {
      backgroundColor: 'black'
    },
    item: {
      flexGrow: 1,
      flex:1,
      minWidth: 400,
      maxWidth: 500,
      padding: 2
    },
    "item-pending": {
      flexGrow: 1,
      flex:1,
      minWidth: 400,
      maxWidth: 500,
      padding: 2,
      opacity: 0.7
    }
  }
})

export default useStyles
