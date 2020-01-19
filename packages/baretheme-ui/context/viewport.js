import React from 'react';
import PropTypes from 'prop-types';

const ViewportContext = React.createContext(null);

const useViewportContext = function useViewportContext() {
  const context = React.useContext(ViewportContext);
  return context;
};


const ViewportProvider = ({ breakpoints, children }) => {
  const buildMediaQueries = (breakpoints) => {
    const getBreakpoint = (breakpoint) => {
      const index = breakpoints.findIndex((item) => item.key === breakpoint);
      const item = breakpoints[index];
      if (!breakpoint) {
        throw new Error(`Breakpoint "${breakpoint}" not found.`);
      }
      return {
        ...item,
        index,
      };
    };
    const ssrBreakpoint = getBreakpoint('medium');

    return {
      isLessThan(breakpoint) {
        const br = getBreakpoint(breakpoint);
        if (typeof window !== 'undefined') {
          return window.matchMedia(`(max-width: ${br.value}px)`).matches;
        }
        return br.index <= ssrBreakpoint.index;
      },
      isGreaterThan(breakpoint) {
        const br = getBreakpoint(breakpoint);
        if (typeof window !== 'undefined') {
          return window.matchMedia(`(min-width: ${br.value + 1}px)`).matches;
        }
        return br.index <= ssrBreakpoint.index;
      },
      isBetween(min, max) {
        const minBr = getBreakpoint(min);
        const maxBr = getBreakpoint(max);
        if (typeof window !== 'undefined') {
          return window.matchMedia(
            `(min-width: ${minBr.value + 1}px) and (max-width: ${maxBr.value}px)`,
          ).matches;
        }
        return (
          minBr.index <= ssrBreakpoint.index
          && maxBr.index <= ssrBreakpoint.index
        );
      },
    };
  };

  return (
    <ViewportContext.Provider value={{
      media: buildMediaQueries(breakpoints),
    }}
    >
      {children}
    </ViewportContext.Provider>
  );
};

ViewportProvider.defaultProps = {
  breakpoints: [],
};

ViewportProvider.propTypes = {
  children: PropTypes.element.isRequired,
  breakpoints: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string,
    value: PropTypes.number,
  })),
};

export default ViewportContext;
export { ViewportProvider, useViewportContext };
