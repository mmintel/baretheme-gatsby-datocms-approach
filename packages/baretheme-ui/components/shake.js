import React from 'react';
import PropTypes from 'prop-types';
import { useSpring, animated } from 'react-spring';

const Shake = ({ animate, children }) => {
  const { x } = useSpring({
    from: { x: 0 },
    x: animate ? 1 : 0,
    config: { mass: 12, tension: 500, friction: 80 },
  });
  return (
    <animated.div
      style={{
        transformOrigin: 'center center',
        transform: animate && x
          .interpolate({
            range: [0, 0.5, 1],
            output: [0, 2, 0],
          })
          .interpolate((x) => `rotate(${x}deg)`),
      }}
    >
      {children}
    </animated.div>
  );
};

Shake.defaultProps = {
  animate: false,
};

Shake.propTypes = {
  animate: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

export default Shake;
