import React from 'react'
import { useDraggable } from '@dnd-kit/core'
import useStyles from './styles'

const DraggableItem = ({ id, targetContainer, type, children }) => {
  const classes = useStyles()

  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id,
    data: {
      type,
      targetContainer
    }
  })

  const elemClasses = [classes.item]
  if (isDragging) {
    elemClasses.push(classes.draggableDragging)
  }

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className={elemClasses.join(' ')}
      id={id}
    >
      {children}
    </div>
  )
}

export default DraggableItem
