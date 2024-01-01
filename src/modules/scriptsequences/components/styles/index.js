import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => {
  return {
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper
    },
    titleContainer: {
      display: 'flex',
      justifyContent:'space-between',
      marginTop: 5,
      marginBottom: 5
    },
    list: {
      width: '100%',
      minHeight: 120
    },
    loading: {
      width: '50 !important',
      height: '50 !important',
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
      left: 0,
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
    },
    sortableGhost: {
      opacity: 0.0,
      cursor: 'grabbing',
      border: '1 solid red',
      position: 'relative',
      backgroundColor: 'pink',
      '& image': {
        opacity: 0.3
      }
    },
    deleteScriptSequence: {
      right: 0,
      margin: 5,
      position: 'absolute',
      color: 'white',
      backgroundColor: 'rgba(0,0,0,0.3)',
      borderRadius: 5,
      padding: 1,
      '& .MuiSvgIcon-root': {
        fontSize: 15
      }
    },
    id: {
      position: 'absolute',
      zIndex: 99,
      color: 'lightgray',
      left: 0,
      right: 0,
      marginLeft: 'auto',
      marginRight: 'auto',
      width: 10,
      padding: 5
    },
    timeline: {
      minHeight: 120,
      width: '100%'
    }
  }
})

export default useStyles
