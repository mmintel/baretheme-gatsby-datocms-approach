import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { HelmetDatoCms } from 'gatsby-source-datocms';
import { IntlProvider } from 'react-intl';

import UIContext from '../context/ui';
import Layout from './layout';
import Site from './site';
import Content from './content';

const Document = ({ pageContext }) => {
  const ui = useContext(UIContext);
  useEffect(
    () => () => {
      ui.closeAll();
    },
    // eslint-disable-next-line
    [],
  );
  return (
    <IntlProvider
      messages={pageContext.dictionary}
      locale={pageContext.node.locale}
      defaultLocale={ui.config.defaultLocale}
    >
      <Site pageContext={pageContext}>
        <Layout pageContext={pageContext}>
          <HelmetDatoCms seo={pageContext.node.seoMetaTags} />
          <Content items={pageContext.node.content} />
        </Layout>
      </Site>
    </IntlProvider>
  );
};

Document.propTypes = {
  pageContext: PropTypes.shape({
    dictionary: PropTypes.object,
    node: PropTypes.shape({
      locale: PropTypes.string,
      seoMetaTags: PropTypes.object,
      blocks: PropTypes.array,
      content: PropTypes.array,
    }),
  }).isRequired,
};

export default Document;
