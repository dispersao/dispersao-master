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
    }
  }
})

export default useStyles
