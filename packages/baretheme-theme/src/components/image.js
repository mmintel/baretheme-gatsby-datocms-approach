import React from 'react';
import PropTypes from 'prop-types';
import GatsbyImage from 'gatsby-image';
import { Media, withSpacing } from '@baretheme/ui';

const Image = ({ fluid, title, ...props }) => <Media caption={title} {...props}><GatsbyImage fluid={fluid} /></Media>;

Image.defaultProps = {
  title: undefined,
};

Image.propTypes = {
  title: PropTypes.string,
  fluid: PropTypes.shape({
    base64: PropTypes.string,
    sizes: PropTypes.string,
    src: PropTypes.string,
    srcSet: PropTypes.string,
    aspectRatio: PropTypes.number,
  }).isRequired,
};

export default withSpacing(Image);
