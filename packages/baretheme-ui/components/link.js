import React from 'react';
import PropTypes from 'prop-types';

const Link = ({
  children, to, internal, external, activeClassName, ...props
}) => {
  const isInternal = /^\/(?!\/)/.test(to);
  const InternalComponent = internal;
  const ExternalComponent = external;

  if (isInternal) {
    return (
      <InternalComponent to={to} activeClassName={activeClassName} {...props}>
        {children}
      </InternalComponent>
    );
  }
  return (
    <ExternalComponent target="_blank" rel="noopener noreferrer" href={to} {...props}>
      {children}
    </ExternalComponent>
  );
};

Link.defaultProps = {
  internal: 'a',
  external: 'a',
  to: undefined,
  className: undefined,
  activeClassName: undefined,
};

Link.propTypes = {
  to: PropTypes.string,
  external: PropTypes.elementType,
  internal: PropTypes.elementType,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  activeClassName: PropTypes.string,
};

export default Link;
