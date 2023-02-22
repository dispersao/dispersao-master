import React from 'react'
import { ReactSortable } from 'react-sortablejs'

const Sortable = React.memo(
  ({
    groupName,
    clone,
    sort,
    children,
    ...props
  }) => {
    return (
      <ReactSortable
        group={{
          name: groupName,
          pull: clone ? 'clone' : false,
          put: sort ? true : false
        }}
        sort={sort}
        filter=".dragDisabled"
        animation={200}
        {...props}
      >
        {children}
      </ReactSortable>
    )
  }
)

export default Sortable
