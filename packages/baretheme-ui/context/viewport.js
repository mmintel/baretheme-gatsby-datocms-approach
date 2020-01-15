import React from 'react';
import PropTypes from 'prop-types';

const ViewportContext = React.createContext(null);

const useViewportContext = function useViewportContext() {
  const context = React.useContext(ViewportContext);
  return context;
};


const ViewportProvider = ({ theme, children }) => {
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
      media: buildMediaQueries(theme.breakpoints),
    }}
    >
      {children}
    </ViewportContext.Provider>
  );
};

ViewportProvider.defaultProps = {
  theme: {
    breakpoints: [],
  },
};

ViewportProvider.propTypes = {
  children: PropTypes.element.isRequired,
  theme: PropTypes.shape({
    breakpoints: PropTypes.array,
  }),
};

export default ViewportContext;
export { ViewportProvider, useViewportContext };
