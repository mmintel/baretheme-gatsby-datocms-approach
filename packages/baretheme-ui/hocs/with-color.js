import React from 'react';
import PropTypes from 'prop-types';
import { colors } from '@baretheme/ui/themes';
import { useTheme } from 'emotion-theming';

const withColor = (Component) => {
  const WithColor = React.forwardRef(
    ({ color, ...props }, ref) => {
      const theme = useTheme();
      return <Component color={theme.color[color]} ref={ref} {...props} />;
    },
  );

  WithColor.displayName = `${Component.displayName || Component.name}WithColor`;

  WithColor.defaultProps = {
    color: 'inherit',
  };

  WithColor.propTypes = {
    color: PropTypes.oneOf(['inherit', ...colors]),
  };

  return WithColor;
};

export default withColor;
