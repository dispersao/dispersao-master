import React from 'react'
import DraggableItem from './DraggableItem.jsx'
import useStyles from './styles'

const DraggableContainer = ({ target, type, children }) => {
  const classes = useStyles()

  const wrappedChildren = (children) => {
    return React.Children.map(children, (child) => {
      if (!React.isValidElement(child)) {
        return child
      } else {
        return (
          <DraggableItem
            id={child.props?.id}
            type={type}
            targetContainer={target}
          >
            {child}
          </DraggableItem>
        )
      }
    })
  }

  return <div className={classes.container}>{wrappedChildren(children)}</div>
}

export default DraggableContainer
