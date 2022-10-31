import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => {
  return {
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
    },
    list: {
      width: '100%'
    },
    item: {
      width: 160,
      height: 120,
      padding: 2,
    },
    "item-played": {
      width: 160,
      height: 120,
      padding: 2,
      opacity: 0.3
    },
    droppper: {
      width:7,
      height:'100%',
      backgroundColor: 'yellow'
    },
    over:{
      width: 160
    },
    progressDivRL: {
      height: '100%',
      position: 'absolute',
      top: 0,
      right: 0,
      backgroundColor: 'red',
      opacity: 0.5
    },
    progressDivLR: {
      height: '100%',
      position: 'absolute',
      top: 0,
      left: 0,
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
