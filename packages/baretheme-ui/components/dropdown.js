import React from 'react';
import PropTypes from 'prop-types';
import Tippy from './tippy';

const Dropdown = ({
  arrow, placement, children, trigger, ...props
}) => (
  <Tippy
    interactive
    arrow={arrow}
    placement={placement}
    trigger={trigger}
    {...props}
  >
    {children}
  </Tippy>
);

Dropdown.defaultProps = {
  trigger: 'click',
  arrow: true,
  placement: 'bottom',
};

Dropdown.propTypes = {
  arrow: PropTypes.bool,
  placement: PropTypes.string,
  children: PropTypes.node.isRequired,
  trigger: PropTypes.oneOf(['mouseenter', 'focus', 'click', 'manual']),
};

export default Dropdown;
