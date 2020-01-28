import React from 'react';
import PropTypes from 'prop-types';
import { useInView } from 'react-hook-inview';
import { animated, useSpring } from 'react-spring';

const Reveal = ({
  threshold, children, once, ...props
}) => {
  const [ref, inView, entry] = useInView({ threshold });
  const [isTop, setIsTop] = React.useState();
  const [wasVisible, setWasVisible] = React.useState(false);
  const yValue = isTop ? -50 : 50;

  React.useEffect(() => {
    setWasVisible(true);
    if (entry) {
      setIsTop(entry.boundingClientRect.y < 0);
    }
  }, [entry]);


  const { y, o } = useSpring({
    o: wasVisible || inView ? 1 : 0,
    y: wasVisible || inView ? 0 : yValue,
  });

  return (
    <animated.div
      style={{
        willChange: 'opacity, transform',
        opacity: o,
        transform: y.interpolate((y) => `translateY(${y}px)`),
      }}
      ref={ref}
      {...props}
    >
      {children}
    </animated.div>
  );
};

Reveal.defaultProps = {
  threshold: 0.5,
  once: false,
};

Reveal.propTypes = {
  once: PropTypes.bool,
  threshold: PropTypes.number,
  children: PropTypes.node.isRequired,
};

export default Reveal;
