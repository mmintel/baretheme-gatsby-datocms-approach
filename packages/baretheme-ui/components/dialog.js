import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { useSpring, animated } from 'react-spring';
import { mdiClose } from '@mdi/js';
import Icon from './icon';

const StyledDialog = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  opacity: 0;
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${(props) => props.theme.color.overlay};

  ${(props) => props.isOpen && css`
    pointer-events: auto;
  `}
`;

const CloseIcon = styled(Icon)`
  position: absolute;
  top: ${(props) => props.theme.spacing(1)};
  right: ${(props) => props.theme.spacing(1)};
  cursor: pointer;
`;

const AnimatedCloseIcon = animated(CloseIcon);
const AnimatedDialog = animated(StyledDialog);

const Dialog = ({
  isOpen, children, onClose, ...props
}) => {
  const { opacity, y, x } = useSpring({
    opacity: isOpen ? 1 : 0,
    y: isOpen ? 0 : -100,
    x: isOpen ? 0 : 100,
  });

  const handleContentClick = (e) => {
    e.stopPropagation();
  };

  const handleCloseClick = (e) => {
    e.stopPropagation();
    onClose();
  };

  React.useEffect(() => {
    const handleKeyup = (e) => {
      if (e.key === 'Escape') {
        if (onClose && typeof onClose === 'function' && isOpen) {
          onClose();
        }
      }
    };

    document.addEventListener('keyup', handleKeyup);

    return () => {
      document.removeEventListener('keyup', handleKeyup);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatedDialog style={{ opacity }} isOpen={isOpen} onClick={onClose} {...props}>
      <AnimatedCloseIcon
        style={{ transform: x.interpolate((x) => `translateX(${x}%)`) }}
        path={mdiClose}
        onClick={handleCloseClick}
      />
      <animated.div
        style={{ transform: y.interpolate((y) => `translateY(${y}px)`) }}
        onClick={handleContentClick}
      >
        {children}
      </animated.div>
    </AnimatedDialog>
  );
};

Dialog.defaultProps = {
  isOpen: false,
  onClose: () => {},
};

Dialog.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  children: PropTypes.node.isRequired,
};

export default Dialog;
