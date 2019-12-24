import React from 'react';
import PropTypes from 'prop-types';
import BaseTippy from '@tippy.js/react';
import styled from '@emotion/styled';
import 'tippy.js/dist/tippy.css';

const StyledTippy = styled(BaseTippy)`
  color: ${(props) => props.theme.color.foreground};
  font-size: ${(props) => props.theme.fontSize(-2)};
  background-color: ${(props) => props.theme.color.raised};
  border-radius: ${(props) => props.theme.radius(2)};
  border: 2px solid ${(props) => props.theme.color.lowered};
  box-shadow: ${(props) => props.theme.shadow(0)};

  .tippy-arrow {
    &:after {
      content: "";
      position: absolute;
      border-color: transparent;
      border-style: solid;
    }
  }

  & > .tippy-arrow {
    &:after {
      z-index: -1;
    }
  }

  &[data-placement^="top"] > .tippy-arrow {
    border-top-color: ${(props) => props.theme.color.raised};

    &:after {
      border-width: 8px 8px 0;
      border-top-color: ${(props) => props.theme.color.lowered};
      transform: translateX(-50%);
      transform-origin: 50% 0;
      bottom: -3px;
    }
  }

  &[data-placement^="right"] > .tippy-arrow {
    border-right-color: ${(props) => props.theme.color.raised};

    &:after {
      border-width: 8px 8px 8px 0;
      border-right-color: red;
      border-right-color: ${(props) => props.theme.color.lowered};
      transform-origin: 7px 50%;
      left: -2px;
      top: -8px;
    }
  }

  &[data-placement^="bottom"] > .tippy-arrow {
    border-bottom-color: ${(props) => props.theme.color.raised};

    &:after {
      border-width: 0 8px 8px;
      border-bottom-color: ${(props) => props.theme.color.lowered};
      transform: translateX(-50%);
      transform-origin: 50% 0;
      top: -3px;
    }
  }

  &[data-placement^="left"] > .tippy-arrow {
    border-left-color: ${(props) => props.theme.color.raised};

    &:after {
      border-width: 8px 0 8px 8px;
      border-left-color: red;
      border-left-color: ${(props) => props.theme.color.lowered};
      transform-origin: 7px 50%;
      right: -2px;
      top: -8px;
    }
  }
`;

const Tippy = ({ content, children, ...props }) => {
  if (content) {
    return (
      <StyledTippy content={content} {...props}>
        {children}
      </StyledTippy>
    );
  }
  return children;
};

Tippy.defaultProps = {
  content: undefined,
};

Tippy.propTypes = {
  content: PropTypes.node,
};

export default Tippy;
