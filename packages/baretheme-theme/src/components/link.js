import React from 'react';
import { Link as GatsbyLink } from 'gatsby';
import { Link } from '@baretheme/ui';

let LinkComponent = Link;

try {
  // eslint-disable-next-line global-require
  LinkComponent = require('../../.cache/addons').default.link;
} catch (e) {
  LinkComponent = Link;
}

const AppLink = (props) => (
  <LinkComponent internal={GatsbyLink} activeClassName="active" {...props} />
);

export default AppLink;
