import React from 'react';
import PropTypes from 'prop-types';
import { omit } from 'lodash';
import { useTheme } from 'emotion-theming';

const directions = [
  {
    alias: 't',
    attr: 'Top',
  },
  {
    alias: 'r',
    attr: 'Right',
  },
  {
    alias: 'b',
    attr: 'Bottom',
  },
  {
    alias: 'l',
    attr: 'Left',
  },
];

const buildAttributes = (base) => [base, ...directions.map((d) => ({
  alias: base.alias + d.alias,
  attr: `${base.attr}${d.attr}`,
}))];

const margin = {
  alias: 'm',
  attr: 'margin',
};
const margins = buildAttributes(margin);

const padding = {
  alias: 'p',
  attr: 'padding',
};
const paddings = buildAttributes(padding);

const spacings = [...margins, ...paddings];
const spacingProps = spacings.map((spacing) => spacing.alias);

const withSpacing = (Component) => {
  const WithSpacing = ({ forwardedRef, ...props }) => {
    const propsWithoutSpacing = omit(props, spacingProps);
    const theme = useTheme();
    const usedSpacings = spacings.filter((spacing) => props[spacing.alias] !== undefined || props[spacing.alias] === null);
    const styles = usedSpacings.reduce((acc, spacing) => ({
      ...acc,
      [spacing.attr]: props[spacing.alias] === 'auto' ? 'auto' : `${theme.spacing(props[spacing.alias])}`,
    }), {});
    return <Component css={styles} ref={forwardedRef} {...propsWithoutSpacing} />;
  };

  const spacingPropTypes = spacings.reduce((acc, spacing) => ({
    ...acc,
    [spacing.alias]: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf(['auto'])]),
  }), {});

  WithSpacing.defaultProps = {
    forwardedRef: undefined,
  };

  WithSpacing.propTypes = {
    ...spacingPropTypes,
    forwardedRef: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.shape({ current: PropTypes.any }),
    ]),
  };

  function forwardRef(props, ref) {
    return <WithSpacing {...props} forwardedRef={ref} />;
  }

  const name = Component.displayName || Component.name;
  forwardRef.displayName = `withSpacing(${name})`;

  return React.forwardRef(forwardRef);
};

export default withSpacing;
