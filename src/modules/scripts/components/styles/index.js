import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '100%'
  },
  button: {
    margin: theme.spacing(1)
  },
  connectButton: {
    margin: theme.spacing(1),
    backgroundColor: '#33ee33'
  },
  retryConnectButton: {
    margin: theme.spacing(1),
    backgroundColor: '#f0813c'
  },
  failedText: {
    ...theme.typography.button,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(1),
    color: '#ee3333',
    display: 'contents'
  },
  warning: {
    fontWeight: 'bold',
    animationName: '$colorChange',
    animationDuration: '700ms',
    animationTimingFunction: theme.transitions.easing.easeInOut,
    animationIterationCount: 'infinite'
  },
  '@keyframes colorChange': {
    '0%': { color: 'red' },
    '50%': { color: theme.palette.text.primary },
    '100%': { color: 'red' }
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
    display: 'block',
    color: '#33ee33',
    width: 30,
    height: 30
  },
  startedText: {
    ...theme.typography.button,
    padding: theme.spacing(1),
    display: 'contents',
    color: '#ccc'
  },
  drawer: {
    maxWidth: 760,
    padding: 15
  },
  drawerClose: {
    float: 'right'
  },
  divider: {
    margin: '0 5px'
  },
  connecterContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
  }
}))

export default useStyles
