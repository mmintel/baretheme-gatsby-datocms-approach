import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { Icon } from '@baretheme/ui';
import { mdiClose, mdiMenu } from '@mdi/js';

const BurgerIcon = styled.div`
  position: relative;
  z-index: 200;
  cursor: pointer;
  fill: ${(props) => props.theme.color.foreground};

  :hover {
    fill: ${(props) => props.theme.color.highlight};
  }
`;

const Burger = ({
  onToggle, isOpen, ...props
}) => (
  <BurgerIcon {...props} onClick={onToggle}>
    {isOpen ? (
      <Icon
        data-testid="close"
        path={mdiClose}
      />
    ) : (
      <Icon
        data-testid="open"
        path={mdiMenu}
      />
    )}
  </BurgerIcon>
);

Burger.defaultProps = {
  isOpen: false,
  onToggle: () => {},
};

Burger.propTypes = {
  isOpen: PropTypes.bool,
  onToggle: PropTypes.func,
};

export default Burger;
