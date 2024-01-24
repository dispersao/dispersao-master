import { useSortable } from '@dnd-kit/sortable'
import React from 'react'
import { CSS } from '@dnd-kit/utilities'

import useStyles from './styles'

const SortableItem = ({ id, disabled, children, type }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id, disabled, data: {
    type
  } })
  const classes = useStyles()

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  }

  const elemClasses = [classes.item]
  if (isDragging) {
    elemClasses.push(classes.sortableDragging)
  }

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className={elemClasses.join(' ')}
      style={style}
      id={id}
    >
      {children}
    </div>
  )
}

export default SortableItem
