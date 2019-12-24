import React from 'react';
import PropTypes from 'prop-types';
import themes from '@baretheme/gatsby-theme-baretheme/themes';

const colors = [
  ...Object.keys(themes.dark.color),
  ...Object.keys(themes.light.color),
];

const withColor = (Component) => {
  const WithColor = React.forwardRef(
    ({ color, ...props }, ref) => <Component color={color} ref={ref} {...props} />,
  );

  WithColor.displayName = `${Component.displayName}WithColor`;

  WithColor.defaultProps = {
    color: 'inherit',
  };
  WithColor.propTypes = {
    color: PropTypes.oneOf(['inherit', ...colors]),
  };

  return WithColor;
};

export default withColor;
