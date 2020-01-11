import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import useResizeAware from 'react-resize-aware';
import { useSpring, animated, interpolate } from 'react-spring';

const OffscreenWrapper = styled.div`
  position: absolute;
  background-color: ${(props) => props.theme.color.lowered};
  display: flex;

  ${(props) => props.position === 'right'
    && css`
      top: 0;
      left: 100%;
      height: 100vh;
    `}

  ${(props) => props.position === 'top'
    && css`
      bottom: 100%;
      left: 0;
      width: 100%;
      transform: translateY(-100%);
    `}
`;

const AnimatedWrapper = animated(OffscreenWrapper);

const Offscreen = ({
  children, isOpen, onResize, onClose, position, onRest, ...props
}) => {
  const [resizeListener, sizes] = useResizeAware();

  const { x, y } = useSpring({
    x: isOpen && position === 'right' ? sizes.width * -1 : 0,
    y: isOpen && position === 'top' ? sizes.height * 1 : 0,
    onRest,
  });

  const handleKeyup = (e) => {
    if (e.key === 'Escape') {
      if (onClose && typeof onClose === 'function') {
        onClose();
      }
    }
  };

  React.useEffect(() => {
    if (onResize && typeof onResize === 'function') {
      onResize(sizes);
    }
  }, [onResize, sizes]);

  return (
    <AnimatedWrapper
      position={position}
      style={{
        transform: interpolate(
          [x, y],
          (x, y) => `translateX(${x}px) translateY(${y}px)`,
        ),
      }}
      onKeyUp={handleKeyup}
      {...props}
    >
      {resizeListener}
      {children}
    </AnimatedWrapper>
  );
};

Offscreen.defaultProps = {
  position: 'right',
  isOpen: false,
  onResize: () => {},
  onClose: () => {},
  onRest: () => {},
};

Offscreen.propTypes = {
  children: PropTypes.node.isRequired,
  position: PropTypes.oneOf(['top', 'right']),
  isOpen: PropTypes.bool,
  onResize: PropTypes.func,
  onClose: PropTypes.func,
  onRest: PropTypes.func,
};

export default Offscreen;
