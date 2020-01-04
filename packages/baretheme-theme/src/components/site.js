import React from 'react';
import PropTypes from 'prop-types';
// eslint-disable-next-line import/no-extraneous-dependencies
import { HelmetDatoCms } from 'gatsby-source-datocms';
import Helmet from 'react-helmet';
import { Bootstrap } from '@baretheme/ui';

const Site = ({ children, pageContext }) => (
  <>
    {pageContext && pageContext.site && (
      <>
        <HelmetDatoCms
          favicon={pageContext.site.faviconMetaTags}
          title={
            pageContext.site.globalSeo
            && pageContext.site.globalSeo.fallbackSeo.title
          }
        />
        <Helmet>
          <html lang={pageContext.node.locale} />
        </Helmet>
      </>
    )}
    <Bootstrap />
    {children}
  </>
);

Site.propTypes = {
  children: PropTypes.node.isRequired,
  pageContext: PropTypes.shape({
    node: PropTypes.shape({
      locale: PropTypes.string,
    }),
    site: PropTypes.shape({
      faviconMetaTags: PropTypes.object,
      globalSeo: PropTypes.shape({
        fallbackSeo: PropTypes.shape({
          title: PropTypes.string,
        }),
      }),
    }),
  }).isRequired,
};

export default Site;
