import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { useSpring, animated } from 'react-spring';
import useResizeAware from 'react-resize-aware';

const StyledFlip = styled.div`
  perspective: 1000px;
`;

const Flipper = styled(animated.div)`
  will-change: transform;
  transform-style: preserve-3d;
  position: relative;
`;

const Side = styled.div`
  display: flex;
  align-items: stretch;
  backface-visibility: hidden;

  position: absolute;
  top: 0;
  left: 0;

  > * {
    width: 100%;
  }
`;

const Front = styled(Side)`
  z-index: 2;
  transform: rotateY(0deg);
`;

const Back = styled(Side)`
  transform: rotateY(180deg);
`;

const Flip = ({
  flipped, back, front,
}) => {
  const [resizeListener, sizes] = useResizeAware();

  const { transform } = useSpring({
    transform: `rotateY(${flipped ? 180 : 0}deg)`,
    config: { mass: 12, tension: 500, friction: 80 },
  });

  return (
    <>
      {resizeListener}
      <StyledFlip style={{ width: sizes.width, height: sizes.height }}>
        <Flipper style={{ transform }}>
          <Front>
            {resizeListener}
            {front}
          </Front>
          <Back style={{ width: sizes.width, height: sizes.height }}>
            {back}
          </Back>
        </Flipper>
      </StyledFlip>
    </>
  );
};

Flip.defaultProps = {
  flipped: false,
};

Flip.propTypes = {
  flipped: PropTypes.bool,
  front: PropTypes.node.isRequired,
  back: PropTypes.node.isRequired,
};

export default Flip;
