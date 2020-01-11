import React from 'react';
import PropTypes from 'prop-types';
import isInternalLink from 'is-internal-link';

const DefaultInternal = ({
  to,
  children,
  // eslint-disable-next-line react/prop-types
  activeClassName,
  ...props
}) => <a href={to} {...props}>{children}</a>;

DefaultInternal.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

const Link = ({
  children, to, internal, external, activeClassName, ...props
}) => {
  const isInternal = isInternalLink(to);
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
  internal: DefaultInternal,
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
