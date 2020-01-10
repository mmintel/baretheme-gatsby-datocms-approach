import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import isPropValid from '@emotion/is-prop-valid';
import withSpacing from '../hocs/with-spacing';
import withColor from '../hocs/with-color';

const blacklistProps = ['size', 'color', 'bold', 'italic', 'uppercase', 'hidden'];

const StyledDisplay = styled('span', {
  shouldForwardProp: (prop) => isPropValid(prop) && !blacklistProps.includes(prop),
})`
  font-style: ${(props) => props.italic && 'italic'};
  font-weight: ${(props) => props.bold && 'bold'};
  text-transform: ${(props) => props.uppercase && 'uppercase'};
  font-size: ${(props) => props.theme.fontSize(props.size)};
  text-align: ${(props) => props.align};
  color: ${(props) => props.theme.color[props.color]};
  user-select: ${(props) => (props.selectable ? 'text' : 'none')};

  ${(props) => props.hidden && css`
    display: block;
    visibility: hidden;
    height: 0;
    max-height: 0;
    overflow: hidden;
  `}
`;

const Display = withSpacing(withColor(({ ...props }) => (
  <StyledDisplay {...props} />
)));

Display.defaultProps = {
  selectable: true,
  bold: false,
  italic: false,
  size: 0,
  uppercase: false,
  hidden: false,
  align: 'left',
};

Display.propTypes = {
  selectable: PropTypes.bool,
  italic: PropTypes.bool,
  bold: PropTypes.bool,
  hidden: PropTypes.bool,
  size: PropTypes.number,
  uppercase: PropTypes.bool,
  align: PropTypes.oneOf(['left', 'center', 'right']),
  children: PropTypes.node.isRequired,
};

export default Display;
