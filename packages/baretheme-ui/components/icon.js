import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import ReactIcon from '@mdi/react';
import withColor from '../hocs/with-color';
import withSpacing from '../hocs/with-spacing';

const blacklistProps = ['color'];

const StyledIcon = styled(ReactIcon, {
  shouldForwardProp: (prop) => !blacklistProps.includes(prop),
})`
  fill: ${(props) => props.theme.color.foreground};

  ${(props) => props.color && css`
    fill: ${props.theme.color[props.color]};
  `}

  ${(props) => props.onClick && css`
    cursor: pointer;
    &:hover {
      fill: ${props.theme.emphasize(props.theme.color.foreground)};
    }
  `}
`;

const Icon = React.forwardRef(({
  size, onClick, color, ...props
}, ref) => (
  <StyledIcon
    onClick={onClick}
    ref={ref}
    size={size}
    color={color}
    {...props}
  />
));

Icon.defaultProps = {
  size: 1,
  onClick: undefined,
  color: undefined,
};

Icon.propTypes = {
  size: PropTypes.number,
  onClick: PropTypes.func,
  color: PropTypes.string,
};

export default withSpacing(withColor(Icon));
