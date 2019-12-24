import React from 'react';
import PropTypes from 'prop-types';
import Tippy from './tippy';

const Dropdown = ({
  arrow, placement, children, ...props
}) => (
  <Tippy
    interactive
    arrow={arrow}
    placement={placement}
    {...props}
  >
    {children}
  </Tippy>
);

Dropdown.defaultProps = {
  arrow: true,
  placement: 'bottom',
};

Dropdown.propTypes = {
  arrow: PropTypes.bool,
  placement: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default Dropdown;
