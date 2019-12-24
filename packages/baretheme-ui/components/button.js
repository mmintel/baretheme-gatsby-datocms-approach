import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import isPropValid from '@emotion/is-prop-valid';
import { Display } from '@baretheme/ui';
import { timingFunctions, rgba } from 'polished';
import withPalett from '../hocs/with-palett';
import withSpacing from '../hocs/with-spacing';
import withColor from '../hocs/with-color';

const blacklistProps = ['styles', 'color', 'loading'];

const StyledButton = withPalett(styled('button', {
  shouldForwardProp: (prop) => isPropValid(prop) && !blacklistProps.includes(prop),
})`
  -webkit-appearance: none;
  display: inline-flex;
  align-items: center;
  user-select: none;
  cursor: pointer;
  line-height: ${(props) => props.theme.lineHeight(0)};
  padding: 0.5em 1.5em;
  border-radius: 2em;
  background-color: transparent;
  transition:
    background 0.5s ${timingFunctions('easeInOut')},
    transform 0.5s ${timingFunctions('easeInOutElastic')};

  &:active {
    transform: scale(0.95);
  }

  svg {
    cursor: pointer;
  }

  ${(props) => props.color && css`
    &&& {
      color: ${props.theme.color[props.color]};
    }
  `}

  ${(props) => !props.palett && css`
    &:hover {
      background-color: ${rgba(props.theme.color.faded, props.theme.alpha[8])};
    }
  `}

  ${(props) => props.palett && css`
    background-color: ${props.theme.palettes[props.palett].background};
    color: ${props.theme.palettes[props.palett].foreground};
  `}
`);

const Button = ({
  children, size, type, nativeType, ...props
}) => (
  <StyledButton type={nativeType} palett={type !== 'default' ? type : null} {...props}>
    <Display selectable={false} size={size}>
      {children}
    </Display>
  </StyledButton>
);

Button.defaultProps = {
  type: 'default',
  nativeType: 'button',
  size: -1,
};

Button.propTypes = {
  type: PropTypes.string,
  nativeType: PropTypes.string,
  size: PropTypes.number,
  children: PropTypes.node.isRequired,
};

export default withColor(withSpacing(withPalett(Button)));
