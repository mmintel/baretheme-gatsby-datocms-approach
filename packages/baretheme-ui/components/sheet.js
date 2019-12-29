import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import useMeasure from 'react-use-measure';
import { useSpring, animated, interpolate } from 'react-spring';

const SheetWrapper = styled.div`
  position: fixed;

  ${(props) => props.position === 'right' && css`
    top: 0;
    right: 0;
    height: 100vh;
  `}

  ${(props) => props.position === 'top' && css`
    top: 0;
    left: 0;
    width: 100%;
  `}

  ${(props) => props.position === 'bottom' && css`
    top: 100%;
    left: 0;
    width: 100%;
  `}
`;

const SheetBody = styled.div`
  background-color: ${(props) => props.theme.color.raised};
  box-shadow: ${(props) => props.theme.shadow(0)};
  display: flex;
`;

const Sheet = ({
  children, isOpen, onResize, onClose, position, onRest,
}) => {
  const [ref, bounds] = useMeasure();

  const { x, y } = useSpring({
    x: isOpen && position === 'right' ? bounds.width * -1 : 0,
    y: isOpen && position === 'bottom' ? bounds.height * -1 : 0,
    onRest,
  });

  React.useEffect(() => {
    const handleKeyup = (e) => {
      if (e.key === 'Escape') {
        if (onClose && typeof onClose === 'function') {
          onClose();
        }
      }
    };

    if (onResize && typeof onResize === 'function') {
      onResize(bounds);
    }

    document.addEventListener('keyup', handleKeyup);

    return () => {
      document.removeEventListener('keyup', handleKeyup);
    };
  }, [onClose, onResize, bounds]);

  return (
    <SheetWrapper
      position={position}
      ref={ref}
    >
      <animated.div
        style={{
          willChange: 'transform',
          transform: interpolate(
            [x, y],
            (x, y) => `translateX(${x}px) translateY(${y}px)`,
          ),
        }}
      >
        <SheetBody>
          {children}
        </SheetBody>
      </animated.div>
    </SheetWrapper>
  );
};

Sheet.defaultProps = {
  position: 'bottom',
  isOpen: false,
  onResize: () => {},
  onClose: () => {},
  onRest: () => {},
};

Sheet.propTypes = {
  children: PropTypes.node.isRequired,
  position: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
  isOpen: PropTypes.bool,
  onRest: PropTypes.func,
  onResize: PropTypes.func,
  onClose: PropTypes.func,
};

export default Sheet;
