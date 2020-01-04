import React from 'react';
import PropTypes from 'prop-types';
import Tippy from './tippy';

const Tooltip = ({ children, ...props }) => (
  <Tippy arrow touch="hold" {...props}>
    {children}
  </Tippy>
);

Tooltip.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Tooltip;
