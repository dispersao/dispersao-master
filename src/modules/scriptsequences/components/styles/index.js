import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => {
  return {
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper
    },
    list: {
      width: '100%',
      minHeight: 120
    },
    loading: {
      width: '50px !important',
      height: '50px !important',
      margin: 2,
      display: 'inline-block'
    },
    item: {
      width: 160,
      height: 120,
      padding: 2
    },
    sentMarker: {
      width: '20% !important',
      height: '20% !important',
      position: 'absolute',
      right: 0,
      display: 'inline-block',
      backgroundColor: 'white',
      opacity: 0.6,
      textAlign: 'center',
      verticalAlign: 'middle',
      color: 'darkviolet'
    },
    played: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      backgroundColor: 'grey',
      padding: 1,
      opacity: 0.6
    },
    droppper: {
      width: 7,
      height: '100%',
      backgroundColor: 'yellow'
    },
    over: {
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
        borderRadius: 20
      }
    }
  }
})

export default useStyles
