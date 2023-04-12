import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    '&> *:not(:last-child)': {
      marginRight: 5
    }
  },
  avatarsmall: {
    width: theme.spacing(3),
    height: theme.spacing(3)
  },
  avatarmedium: {
    width: theme.spacing(5),
    height: theme.spacing(5)
  }
}))

export default useStyles
