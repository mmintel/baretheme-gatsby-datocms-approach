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

const Display = ({ ...props }) => (
  <StyledDisplay {...props} />
);

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

const StyledHeadline = styled(Display)`
  font-weight: bold;
  color: ${(props) => props.theme.color.highlight};

  &&& + & {
    margin-top: 0 !important;
  }
`;

export const Headline = ({ as, ...props }) => <StyledHeadline as={as} {...props} />;

Headline.defaultProps = {
  as: 'h2',
};

Headline.propTypes = {
  as: PropTypes.node,
};

const StyledParagraph = styled(Display)`
  & + & {
    margin-bottom: 0.125em;

    &:not(:first-of-type) {
      margin-top: 0.75em;
    }
  }
`;

export const Paragraph = ({ as, ...props }) => <StyledParagraph as={as} {...props} />;

Paragraph.defaultProps = {
  as: 'p',
};

Paragraph.propTypes = {
  as: PropTypes.node,
};


export default withColor(withSpacing(Display));
