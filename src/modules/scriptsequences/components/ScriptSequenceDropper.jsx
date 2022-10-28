import React from 'react'
import { useDrop } from 'react-dnd'
import PropTypes from 'prop-types'
import useStyles from './styles/'

const ScriptSequenceDropper = ({ index }) => {
  const classes = useStyles()

  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: 'SEQUENCE',
      drop: () => console.log('druopped!'),
      collect: (monitor) => ({
        isOver: !!monitor.isOver()
      })
    }),
    [index]
  )

  return (
    <div
      ref={drop}
      className={[classes.droppper]}
    />
  )
}


ScriptSequenceDropper.propTypes = {
  index: PropTypes.number.isRequired
}

export default ScriptSequenceDropper
