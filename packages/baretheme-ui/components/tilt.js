import React from 'react';
import styled from '@emotion/styled';
import { useSpring, animated } from 'react-spring';

const calc = (x, y) => [-(y - window.innerHeight / 2) / 20, (x - window.innerWidth / 2) / 20, 1.1];
const trans = (x, y, s) => `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`;

const AnimatedTilt = styled(animated.div)`
  will-change: transform;
`;

const Tilt = () => {
  const [{ xys }, set] = useSpring(() => ({ xys: [0, 0, 1], config: { mass: 5, tension: 350, friction: 40 } }));
  return (
    <AnimatedTilt
      onMouseMove={({ clientX: x, clientY: y }) => set({ xys: calc(x, y) })}
      onMouseLeave={() => set({ xys: [0, 0, 1] })}
      style={{ transform: xys.interpolate(trans) }}
    />
  );
};

export default Tilt;
