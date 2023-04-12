import React from 'react'
import PropTypes from 'prop-types'
import useStyles from './styles'
import { Avatar, Typography } from '@material-ui/core'

const Contentcreator = React.memo(
  ({
    name,
    icon: { url },
    mediaUrl,
    text = '',
    children = null,
    size = 'medium'
  }) => {
    const classes = useStyles()

    return (
      <div className={classes.container}>
        <Avatar
          src={`${mediaUrl}${url}`}
          className={classes[`avatar${size}`]}
        />
        <div>
          <Typography variant="body2" color="textSecondary">
            {name}
            {text ? ` ${text}...` : ''}
          </Typography>
          {children}
        </div>
      </div>
    )
  }
)

Contentcreator.proptypes = {
  name: PropTypes.string,
  icon: PropTypes.shape({
    url: PropTypes.string
  }),
  mediaUrl: PropTypes.string,
  text: PropTypes.string,
  size: PropTypes.oneOf(['small', 'medium'])
}

export default Contentcreator
