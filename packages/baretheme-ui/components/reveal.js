import React from 'react';
import PropTypes from 'prop-types';
import { useInViewEffect } from 'react-hook-inview';
import { animated, useSpring } from 'react-spring';
import composeRefs from '@seznam/compose-react-refs';

const Reveal = ({ threshold, children }) => {
  const innerRef = React.useRef();
  const [scrolled, setScrolled] = React.useState(0);
  const [partlyVisible, setPartlyVisible] = React.useState(false);

  const { o } = useSpring({
    o: scrolled,
  });

  const handleScroll = () => {
    const scrollY = window.pageYOffset;
    const el = innerRef.current;
    const elementBounds = el.getBoundingClientRect();
    const absoluteThreshold = elementBounds.height * threshold;
    const { offsetTop } = el;
    const offsetBottom = offsetTop + elementBounds.height;
    const viewportOffsetBottom = scrollY + window.innerHeight;
    const viewportOffsetTop = scrollY;
    const isUpperPart = offsetBottom > viewportOffsetBottom;

    if (!isUpperPart) {
      const y = offsetBottom - viewportOffsetTop;
      const value = y / absoluteThreshold;
      window.requestAnimationFrame(() => {
        setScrolled(value);
      });
    } else {
      const y = viewportOffsetBottom - offsetTop;
      const value = y / absoluteThreshold;
      window.requestAnimationFrame(() => {
        setScrolled(value);
      });
    }
  };

  React.useEffect(() => {
    if (partlyVisible) {
      window.addEventListener('scroll', handleScroll);
    } else {
      window.removeEventListener('scroll', handleScroll);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [partlyVisible, handleScroll]);

  const ref = useInViewEffect(([entry]) => {
    const isVisible = entry.isIntersecting;
    const isCompletelyVisible = entry.intersectionRatio > threshold;
    const isPartlyVisible = entry.intersectionRatio > 0 && entry.intersectionRatio < threshold;

    if (isPartlyVisible) {
      setPartlyVisible(true);
    } else {
      setPartlyVisible(false);
    }

    if (isCompletelyVisible) {
      setScrolled(1);
    }

    if (!isVisible) {
      setScrolled(0);
    }
  }, { threshold: [0, threshold, 1] });

  return (
    <div ref={composeRefs(innerRef, ref)}>
      <animated.div
        style={{
          willChange: 'opacity, transform',
          opacity: o,
          transform: o.interpolate({ range: [0, 1], output: [50, 0] }).interpolate((o) => `translateY(${o}px)`),
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
