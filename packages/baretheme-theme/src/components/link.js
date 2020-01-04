import React from 'react';
import { Link as GatsbyLink } from 'gatsby';
import { Link } from '@baretheme/ui';

let addons;
try {
  // eslint-disable-next-line
  addons = require('../../.cache/addons').default;
} catch (e) {
  // ignore
}

const AppLink = (props) => {
  if (addons.link) {
    return <addons.link internal={GatsbyLink} activeClassName="active" {...props} />;
  }
  return (
    <Link internal={GatsbyLink} activeClassName="active" {...props} />
  );
};

export default AppLink;
