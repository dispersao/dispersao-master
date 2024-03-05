import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
    minHeight: '50px',
    width: '100%'
  },
  item: {
    cursor: 'grab',
    display: 'inline-block'
  },
  sortableDragging: {
    opacity: 0.5
  },
  draggableDragging: {
    opacity: 0.7,
    border: '2px dotted grey'
  }
}))

export default useStyles
