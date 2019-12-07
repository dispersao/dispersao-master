import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => {
  return {
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
    },
    item: {
      width: 120,
      height: 120,
      padding: 2,
    },
    "item-played": {
      width: 120,
      height: 120,
      padding: 2,
      opacity: 0.3
    },
    progressDiv: {
      height: '100%',
      position: 'absolute',
      top: 0,
      right: 0,
      backgroundColor: 'red',
      opacity: 0.5
    },
    progress: {
      root: {
        height: 10,
        marginBottom: 5
      },
      bar: {
        borderRadius: 20,
      },
    }
  }
})

export default useStyles
