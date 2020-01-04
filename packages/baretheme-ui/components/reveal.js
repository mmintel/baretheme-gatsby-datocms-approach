import React from 'react';
import PropTypes from 'prop-types';
import { useInView } from 'react-hook-inview';
import { animated, useSpring } from 'react-spring';

const Reveal = ({ threshold, children, ...props }) => {
  const [ref, inView, entry] = useInView({ threshold });
  const [isTop, setIsTop] = React.useState();
  const yValue = isTop ? -50 : 50;

  React.useEffect(() => {
    if (entry) {
      setIsTop(entry.boundingClientRect.y < 0);
    }
  }, [entry]);


  const { y, o } = useSpring({
    o: inView ? 1 : 0,
    y: inView ? 0 : yValue,
  });

  return (
    <div ref={ref} {...props}>
      <animated.div
        style={{
          willChange: 'opacity, transform',
          opacity: o,
          transform: y.interpolate((y) => `translateY(${y}px)`),
        }}
      >
        {children}
      </animated.div>
    </div>
  );
};

Reveal.defaultProps = {
  threshold: 0.5,
};

Reveal.propTypes = {
  threshold: PropTypes.number,
  children: PropTypes.node.isRequired,
};

export default Reveal;
