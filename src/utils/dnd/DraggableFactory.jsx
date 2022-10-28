import { CallMissedSharp } from '@material-ui/icons'
import React from 'react'
import { Draggable } from 'react-beautiful-dnd'

const DraggableFactory = (id, index, clone = true) =>
  React.memo(({ children, ...props }) => {
    return (
      <Draggable draggableId={id.toString()} index={index}>
        {(provided, snapshot) => {
          return (
            <>
              <li
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                {...props}
              >
                {children}
              </li>
              {clone && snapshot.isDragging && (
                <li>
                  {React.Children.map(children, (child) =>
                    React.cloneElement(child)
                  )}
                </li>
              )}
            </>
          )
        }}
      </Draggable>
    )
  })

export default DraggableFactory
