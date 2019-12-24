import React from 'react';
import Tippy from './tippy';

const Tooltip = ({ children, ...props }) => (
  <Tippy arrow {...props}>
    {children}
  </Tippy>
);

export default Tooltip;
