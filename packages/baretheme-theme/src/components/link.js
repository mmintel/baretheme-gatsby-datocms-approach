import React from 'react';
import { Link as GatsbyLink } from 'gatsby';
import { Link } from '@baretheme/ui';

const addons = require('../../.cache/addons').default;

const AppLink = (props) => {
  if (addons.link) {
    return <addons.link internal={GatsbyLink} activeClassName="active" {...props} />;
  }
  return (
    <Link internal={GatsbyLink} activeClassName="active" {...props} />
  );
};

export default AppLink;
