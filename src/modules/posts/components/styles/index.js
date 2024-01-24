import { makeStyles } from '@material-ui/core'
import { red } from '@material-ui/core/colors'


const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  item: {
    flexGrow: 1,
    flex:1,
    minWidth: 300,
    padding: 2
  },

  disabled: {
    opacity: 0.2
  },
  
  tabsRoot: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: 350,
    backgroundColor: 'rgba(200,200,200,0.5)'
  },
  image: {
    width: 128,
    maxHeight: 128
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%'
  },
  commentContainer: {
    backgroundColor: '#ccc'
  },
  content: {
    '&> *:not(:last-child)': {
      marginBottom: 3
    }
  },
  headerContainer: {
    display: 'flex'
  }
  
}))


export default useStyles
