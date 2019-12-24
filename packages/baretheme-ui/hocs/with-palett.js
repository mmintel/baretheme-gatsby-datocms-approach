import React from 'react';
import PropTypes from 'prop-types';
import { palettes } from '@baretheme/gatsby-theme-baretheme';

const withPalett = (Component) => {
  const WithPalett = ({ palett, ...props }) => {
    if (palett) {
      return (
        <Component palett={palett} {...props} />
      );
    }
    return <Component {...props} />;
  };

  WithPalett.defaultProps = {
    palett: undefined,
  };

  WithPalett.propTypes = {
    palett: PropTypes.oneOf(palettes),
  };

  return WithPalett;
};

withPalett.propTypes = {
  Component: PropTypes.node,
};

export default withPalett;
