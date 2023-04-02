import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => {
  return {
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
      '&> *:not(:last-child)': {
        marginBottom: '5px !important'
      }
    },
    published: {
      backgroundColor: 'black'
    },
    item: {
      flexGrow: 1,
      flex: 1,
      minWidth: 400,
      maxWidth: 500,
      padding: 2,
      '&.pending': {
        opacity: 0.7
      }
    },
    republisherButton: {
      marginInline: 5,
      color: 'white',
      backgroundColor: 'rgba(0,0,0,0.3)',
      borderRadius: 5,
      padding: 1,
      '& .MuiSvgIcon-root': {
        fontSize: 15
      }
    },
    sesconInfoContainer: {
      height: 'min-content',
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    likesBox: {
      height: 'fit-content',
      width: 'fit-content'
    },
    likeIconContainer: {
      height: 'fit-content',
      flexDirection: 'row',
      flex: 1,
      display: 'flex',
      alignItems: 'center',
      width: 'fit-content',
      marginInline: 5,
      color: '#aaa',
      '&.disabled': {
        opacity: 0.7
      }
    },
    likeIcon: {
      padding: 1,
      fontSize: 15
    },
    sessioncontentHeaderContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    sessioncontentStatsContainer: {
      width: 'fit-content',
      color: '#aaa'
    },
    statsContainer: {
      display: 'flex',
      marginInline: 5,
      alignItems: 'center'
    },
    statsIcon: {
      padding: 1,
      fontSize: 20
    }
  }
})

export default useStyles
