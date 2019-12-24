// import React, { useState } from 'react';
// import PropTypes from 'prop-types';
// import { useSpring, animated } from 'react-spring';
// import useResizeAware from 'react-resize-aware';
// import { useScrollYPosition } from 'react-use-scroll-position';

// let lastScrollY = 0;
// let lastScrollDirection = 'down';
// let scrolledInDirection = 0;

// const Headroom = ({
//   children, upTolerance, downTolerance, ...props
// }) => {
//   const [resizeListener, sizes] = useResizeAware();
//   const scrollY = useScrollYPosition();
//   const [position, setPosition] = useState(0);

//   React.useEffect(() => {
//     // const documentBounds = document.documentElement.getBoundingClientRect();
//     const belowHeader = scrollY > sizes.height + downTolerance;
//     let scrollDirection;

//     if (lastScrollY > scrollY) {
//       scrollDirection = 'up';
//     } else {
//       scrollDirection = 'down';
//     }

//     if (scrollDirection !== lastScrollDirection) {
//       scrolledInDirection = 0;
//     } else {
//       scrolledInDirection += 1;
//     }

//     console.log(scrollDirection, scrolledInDirection);

//     if (scrollDirection === 'down' && belowHeader) {
//       console.log('below');
//       console.log(scrollY, sizes.height);
//       if (scrolledInDirection <= sizes.height) {
//         setPosition(scrollY - scrolledInDirection);
//       } else {
//         setPosition(scrollY - sizes.height);
//       }
//     } else if (scrollDirection === 'up' && scrolledInDirection > upTolerance) {
//       setPosition(scrollY);
//     }


//     lastScrollDirection = scrollDirection;
//     lastScrollY = scrollY;
//   }, [scrollY, sizes.height]);

//   const { y } = useSpring({
//     y: position,
//     config: {
//       mass: 1,
//       tension: 0,
//       friction: 0,
//     },
//   });

//   return (
//     <>
//       <div
//         style={{
//           width: sizes.width,
//           height: sizes.height,
//         }}
//         {...props}
//       />
//       <animated.div style={{
//         position: 'fixed',
//         zIndex: 99,
//         width: '100%',
//         willChange: 'transform',
//         // transform: y.interpolate((y) => `translateY(${y}px)`),
//         top: 0,
//         left: 0,
//       }}
//       >
//         {resizeListener}
//         { typeof children === 'function' ? children() : children }
//       </animated.div>
//     </>
//   );
// };

// Headroom.defaultProps = {
//   downTolerance: 100,
//   upTolerance: 20,
// };

// Headroom.propTypes = {
//   downTolerance: PropTypes.number,
//   upTolerance: PropTypes.number,
//   children: PropTypes.node.isRequired,
// };

// export default Headroom;
