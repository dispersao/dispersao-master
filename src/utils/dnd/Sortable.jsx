import React from 'react'
import { ReactSortable } from 'react-sortablejs'

const Sortable = React.memo(
  ({
    id,
    groupName,
    list,
    setList,
    ghostClass,
    onEnd,
    clone,
    sort,
    tag,
    children,
    ...props
  }) => {
    return (
      <ReactSortable
        id={id}
        list={list}
        setList={setList}
        ghostClass={ghostClass}
        onEnd={onEnd}
        group={{
          name: groupName,
          pull: clone ? 'clone' : false,
          put: sort ? true : false
        }}
        sort={sort}
        filter=".dragDisabled"
        animation={200}
        tag={tag}
        {...props}
      >
        {children}
      </ReactSortable>
    )
  }
)

export default Sortable
