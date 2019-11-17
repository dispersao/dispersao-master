import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '100%'
  },
  button: {
    margin: theme.spacing(1),
  },
  connectButton: {
    backgroundColor: '#33ee33'
  },
  failedText: {
    ...theme.typography.button,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(1),
    color: '#ee3333',
    display: 'contents'
  },
  connectingText: {
    ...theme.typography.button,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(1),
    display: 'contents',
    color: '#ccc'
  },
  connectedText: {
    ...theme.typography.button,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(1),
    display: 'contents',
    color: '#33ee33'
  }
}))

export default useStyles
