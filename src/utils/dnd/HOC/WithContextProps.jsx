import React from 'react'
import { Context } from '../SortableContext.jsx';

const WithContextProps = (Component, fields = {}) => {
  const MemoComponent = React.memo(Component);
  return (props) => (
    <Context.Consumer>
      {(contextValues) => {
        const mappedProps = Object.entries(fields).reduce(
          (acc, [key, field]) => ({
            ...acc,
            [key]: contextValues[field]
          }),
          {}
        );
        return <MemoComponent {...mappedProps} {...props} />;
      }}
    </Context.Consumer>
  );
};

export default WithContextProps
