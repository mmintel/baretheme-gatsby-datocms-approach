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

  ${(props) => props.onClick && css`
    cursor: pointer;
  `}

  ${(props) => props.color && css`
    fill: ${props.color};
  `}

  ${(props) => props.onClick && !props.color && css`
    :hover {
      fill: ${props.theme.emphasize(props.theme.color.foreground)};
    }
  `}

  ${(props) => props.onClick && props.color && css`
    :hover {
      fill: ${props.theme.emphasize(props.color)};
    }
  `}
`;

const Icon = React.forwardRef(({
  size, path, color, ...props
}, ref) => (
  <StyledIcon
    ref={ref}
    size={size}
    path={path}
    color={color}
    {...props}
  />
));

Icon.defaultProps = {
  size: 1,
  color: undefined,
};

Icon.propTypes = {
  path: PropTypes.string.isRequired,
  size: PropTypes.number,
  color: PropTypes.string,
};

export default withSpacing(withColor(Icon));
