import React from 'react'
import {
  SortableContext,
  rectSortingStrategy,
  useSortable
} from '@dnd-kit/sortable'
import SortableItem from './SortableItem.jsx'

import useStyles from './styles'

const SortableContainer = ({ id, data, disabled, type, children }) => {
  const { setNodeRef } = useSortable({ id })
  const classes = useStyles()

  const wrappedChildren = (children) => {
    return React.Children.map(children, (child) => {
      if (!React.isValidElement(child) || disabled.includes(child.props?.id)) {
        return child
      } else {
        return (
          <SortableItem id={child.props?.id} disabled={false} type={type}>
            {child}
          </SortableItem>
        )
      }
    })
  }

  return (
    <SortableContext id={id} items={data} strategy={rectSortingStrategy}>
      <div ref={setNodeRef} className={classes.container}>
        {wrappedChildren(children)}
      </div>
    </SortableContext>
  )
}

export default SortableContainer
