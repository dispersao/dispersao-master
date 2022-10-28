import React from 'react'
import { Droppable } from 'react-beautiful-dnd'

const DropableFactory =
  (id, dropDisabled) =>
  ({ children, ...props }) => {
    return (
      <Droppable
        droppableId={id}
        direction="horizontal"
        isDropDisabled={dropDisabled}
      >
        {(provided) => (
          <ul ref={provided.innerRef} {...provided.droppableProps} {...props}>
            {children}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    )
  }

export default DropableFactory
