import React from 'react';
import PropTypes from 'prop-types';
import { useMediaQuery } from 'react-responsive';

const ViewportContext = React.createContext(null);

const useViewportContext = function useViewportContext() {
  const context = React.useContext(ViewportContext);
  return context;
};

const ViewportProvider = ({ children }) => {
  const isOnlySmall = useMediaQuery({ query: '(max-width: 479px)' });
  const isMedium = useMediaQuery({ query: '(min-width: 480px)' });
  const isOnlyMedium = useMediaQuery({ query: '(min-width: 480px) and (max-width: 1169px)' });
  const isLarge = useMediaQuery({ query: '(min-width: 1170px)' });
  const isOnlyLarge = useMediaQuery({ query: '(min-width: 1170px) and (max-width: 1439px)' });
  const isHuge = useMediaQuery({ query: '(min-width: 1440px)' });
  const isOnlyHuge = useMediaQuery({ query: '(min-width: 1440px) and (max-width: 1999px)' });
  const isGigantic = useMediaQuery({ query: '(min-width: 2000px)' });
  const isPortrait = useMediaQuery({ query: '(orientation: portrait)' });
  const isRetina = useMediaQuery({ query: '(min-resolution: 2dppx)' });

  return (
    <ViewportContext.Provider value={{
      isPortrait,
      isRetina,
      isOnlySmall,
      isMedium,
      isOnlyMedium,
      isLarge,
      isOnlyLarge,
      isHuge,
      isOnlyHuge,
      isGigantic,
    }}
    >
      {children}
    </ViewportContext.Provider>
  );
};

ViewportProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default ViewportContext;
export { ViewportProvider, useViewportContext };
