import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  profile: {
    display: 'flex',
    alignItems: 'center',
    padding: '5px 10px',
    backgroundColor: 'rgba(200,200,200,0.5)',
    '&:not(:last-child)': {
      marginRight: 5
    },
    '&> *:not(:last-child)': {
      marginRight: 5
    }

  },
  profileAvatar: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  }
}))

export default useStyles
