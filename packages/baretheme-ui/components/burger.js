import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { useTheme } from 'emotion-theming';
import { HamburgerVortex as MenuIcon } from 'react-animated-burgers';

const BurgerIcon = styled(MenuIcon)`
  position: relative;
  z-index: 1;
  cursor: pointer;
  fill: ${(props) => props.theme.color.foreground};

  :hover {
    fill: ${(props) => props.theme.color.highlight};
  }
`;

const Burger = ({
  onToggle, isOpen,
}) => {
  const theme = useTheme();
  return (
    <BurgerIcon
      buttonWidth={16}
      isActive={isOpen}
      toggleButton={onToggle}
      barColor={theme.color.highlight}
    />
  );
};

Burger.defaultProps = {
  isOpen: false,
  onToggle: () => {},
};

Burger.propTypes = {
  isOpen: PropTypes.bool,
  onToggle: PropTypes.func,
};

export default Burger;
