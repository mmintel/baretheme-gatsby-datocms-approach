import React from 'react';
import { Link } from '@baretheme/ui';
import { OutboundLink } from 'gatsby-plugin-google-analytics';

const TrackedLink = ({ ...props }) => (
  <Link external={OutboundLink} {...props} />
);

export default TrackedLink;
