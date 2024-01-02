import { makeStyles } from '@material-ui/core'
import { red } from '@material-ui/core/colors'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  },
  item: {
    width: 160,
    height: 120,
    padding: 2,
    listStyleType: 'none',
    cursor: 'pointer'
  },
  image: {
    width: 160,
    height: 120,
    objectFit: 'cover'
  },
  enabled: {
    opacity: 1
  },
  disabled: {
    display: 'none'
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.34)'
  },
  accordion: {
    width: '100%'
  },
  sequencesContent: {
    width: '100%'
  },
  tilebar: {
    '&:hover': {
      top: 0,
      height: 'auto'
    },
    backgroundColor: 'rgba(0,0,0,0.25)',
    cursor: 'pointer',
    '& .MuiGridListTileBar-title': {
      color: red,
      'font-size': '0.9rem'
    },
    '& .MuiGridListTileBar-subtitle': {
      'font-size': '0.65rem',
      'white-space': 'normal',
      'text-overflow': 'clip'
    }
  },
  tileInfo: {},
  tileInfoOpacity: {
    opacity: 0.6
  },
  playedIcon: {
    color: '#ccc',
    position: 'absolute',
    opacity: 0.75,
    '&.large': {
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      fontSize: 80
    },
    '&.small': {
      top: 0,
      right: 0,
      fontSize: 40
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
  internalVideoPlayer: {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  },
  sequenceinfoS: {
    height: 20,
    fontSize: '0.5rem'
  }
}))

export default useStyles
