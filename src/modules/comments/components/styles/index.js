import { makeStyles } from '@material-ui/core'
// import { red } from '@material-ui/core/colors'


const useStyles = makeStyles(() => ({
  item: {
    flexGrow: 1,
    flex:1,
    minWidth: 400,
    padding: 10
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
