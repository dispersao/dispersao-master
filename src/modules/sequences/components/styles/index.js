import { makeStyles } from '@material-ui/core'


const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  },
  item: {
    width: 120,
    height: 120,
    padding: 2
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.34)',
  },
  tilebar: {
    backgroundColor: 'rgba(0,0,0,0.25)'
  }
}))


export default useStyles
