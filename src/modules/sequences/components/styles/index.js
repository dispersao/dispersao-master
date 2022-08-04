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
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  },
  item: {
    width: 160,
    height: 120,
    padding: 2
  },
  enabled: {
    opacity:1
  },
  disabled: {
    opacity:0.3
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.34)',
  },
  tilebar: {
    "&:hover": {
      top: 0,
      height: 'auto'
    },
    backgroundColor: 'rgba(0,0,0,0.25)',
    cursor:'pointer',
    '& .MuiGridListTileBar-title': {
      color: red,
      'font-size': '0.9rem'
    },
    '& .MuiGridListTileBar-subtitle': {
      'font-size':'0.65rem',
      'white-space':'normal',
      'text-overflow': 'clip',
    }
  }
}))


export default useStyles
