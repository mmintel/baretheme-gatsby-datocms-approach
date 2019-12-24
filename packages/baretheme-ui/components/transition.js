// import React from "react";
// import { Spring } from "react-spring/renderprops";
// import TransitionLink, { TransitionState } from "gatsby-plugin-transition-link";

// const SlideIn = ({ children }) => (
//   <TransitionState>
//     {({ transitionStatus, exit, entry }) => {
//       const mount = ["entering", "entered"].includes(transitionStatus);
//       const seconds = mount ? entry.length : exit.length;

//       return (
//         <Spring
//           to={{
//             transform: `translateY(${mount ? 0 : "20px"})`,
//             opacity: mount ? 1 : 0
//           }}
//           config={{
//             duration: seconds * 1000
//           }}
//         >
//           {props => <div style={props}>{children}</div>}
//         </Spring>
//       );
//     }}
//   </TransitionState>
// );

// const SpringLink = ({ to, children }) => (
//   <TransitionLink to={to} exit={{ length: 1 }} entry={{ length: 1 }}>
//     {children}
//   </TransitionLink>
// );

// export { SlideIn, SpringLink };
