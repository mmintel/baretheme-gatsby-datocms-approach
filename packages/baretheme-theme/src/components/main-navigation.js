import React from 'react';
import PropTypes from 'prop-types';

import { Burger } from '@baretheme/ui';
import Nav from './nav';

const MainNavigation = ({
  compact, items, onToggle, isOpen,
}) => (
  <nav>
    {compact && <Burger onToggle={onToggle} isOpen={isOpen} />}
    {!compact && <Nav type="bar" items={items} />}
  </nav>
);

MainNavigation.defaultProps = {
  compact: false,
  isOpen: false,
  onToggle: () => {},
};

MainNavigation.propTypes = {
  compact: PropTypes.bool,
  onToggle: PropTypes.func,
  isOpen: PropTypes.bool,
  items: PropTypes.arrayOf(PropTypes.shape({
    slug: PropTypes.string,
  })).isRequired,
};

export default MainNavigation;
