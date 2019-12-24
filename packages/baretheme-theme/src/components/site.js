import React from 'react';
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

export default Site;
