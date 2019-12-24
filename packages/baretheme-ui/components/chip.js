import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import Display from './display';

const StyledChip = styled.span`
  display: inline-block;
  line-height: 100%;
  background-color: ${(props) => props.theme.color.dimmed};
  color: ${(props) => props.theme.color.highlight};
  padding: 0.25em 0.5em;
  border-radius: ${(props) => props.theme.radius(2)};
  vertical-align: baseline;
  white-space: nowrap;
  position: relative;
  top: -0.2em;

  & + & {
    margin-left: ${(props) => props.theme.spacing(-2)};
  }
`;

const Chip = ({ children, ...props }) => (
  <Display {...props}>
    <StyledChip>{children}</StyledChip>
  </Display>
);

Chip.defaultProps = {
  size: -2,
};

Chip.propTypes = {
  size: PropTypes.number,
  children: PropTypes.node.isRequired,
};

export default Chip;
