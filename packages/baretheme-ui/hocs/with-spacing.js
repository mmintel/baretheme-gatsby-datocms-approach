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
  const WithSpacing = React.forwardRef((props, ref) => {
    const propsWithoutSpacing = omit(props, spacingProps);
    const theme = useTheme();
    const usedSpacings = spacings.filter((spacing) => props[spacing.alias] !== undefined || props[spacing.alias] === null);
    const styles = usedSpacings.reduce((acc, spacing) => ({
      ...acc,
      [spacing.attr]: props[spacing.alias] === 'auto' ? 'auto' : `${theme.spacing(props[spacing.alias])}`,
    }), {});
    return <Component css={styles} ref={ref} {...propsWithoutSpacing} />;
  });

  const spacingPropTypes = spacings.reduce((acc, spacing) => ({
    ...acc,
    [spacing.alias]: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf(['auto'])]),
  }), {});

  WithSpacing.propTypes = spacingPropTypes;

  return WithSpacing;
};

export default withSpacing;
