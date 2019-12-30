const path = require('path');
const config = require('../config');

module.exports = async ({ graphql, actions }, themeOptions) => {
  const options = { ...config, ...themeOptions };
  const { createPage } = actions;
  const documentTemplate = path.resolve(__dirname, '../src/components/document.js');
  const queries = [];

  options.plugins.forEach((plgn) => {
    // eslint-disable-next-line
    let plugin = require(`${plgn.name}`);

    if (typeof plugin === 'function') {
      plugin = plugin(options);
    }

    if (plugin.query) {
      queries.push(plugin.query);
    }
  });

  const mergedQueries = queries.reduce(
    (acc, query) => `
      ${acc}
      ${query}
    `,
    '',
  );

  return graphql(
    `
    query DocumentQuery($filter: DatoCmsDocumentFilterInput) {
      allDatoCmsDocument(filter:$filter) {
        edges {
          node {
            title
            active
            position
            locale
            slug
            allSlugLocales: _allSlugLocales {
              locale
              value
            }
            treeParent {
              slug
              active
            }
            tags {
              id
              title
            }
            parent {
              id
            }
            seoMetaTags {
              tags
            }
            blocks {
              type: __typename
              ${mergedQueries}
            }
          }
        }
      }
    }
  `,
    {
      filter: options.useTranslations
        ? {
          locale: {
            glob: '*',
          },
        }
        : {
          locale: {
            eq: options.defaultLocale,
          },
        },
    },
  ).then((result) => {
    if (result.errors) {
      throw result.errors;
    }

    return Promise.all(
      result.data.allDatoCmsDocument.edges.map(async (edge) => {
        if (!options.showInactiveDocuments && !edge.node.active) return;
        if (edge.node.treeParent && !options.showInactiveDocuments && !edge.node.treeParent.active) return;

        let path = edge.node.treeParent
          ? `${edge.node.treeParent.slug}/${edge.node.slug}`
          : `${edge.node.slug}`;
        const isIndex = !edge.node.parent && edge.node.position === 1;
        const isDefaultLocale = edge.node.locale === options.defaultLocale;

        const nodeDataQuery = await graphql(
          `
            query NodeQuery($locale: String) {
              datoCmsSite(locale: { eq: $locale }) {
                locales
                globalSeo {
                  siteName
                  titleSuffix
                  twitterAccount
                  facebookPageUrl
                  fallbackSeo {
                    title
                    description
                    image {
                      url
                    }
                    twitterCard
                  }
                }
                faviconMetaTags {
                  tags
                }
              }
              datoCmsLayout(locale: { eq: $locale }) {
                mainNavigation {
                  id
                  slug
                  title
                  active
                }
                secondaryNavigation {
                  id
                  slug
                  title
                  active
                }
                socialAccounts {
                  title
                  url
                  id
                }
                before {
                  type: __typename
                  ${mergedQueries}
                }
                after {
                  type: __typename
                  ${mergedQueries}
                }
                disclaimerDocument {
                  slug
                }
              }
              datoCmsDictionary(locale: { eq: $locale }) {
                copyrightNotice
                cookieConsentDescription
                cookieConsentAccept
                cookieConsentReadMore
                activateDarkTheme
                activateLightTheme
                openSearch
                changeLanguage
                searchResults
                searchResultsOfOtherLocales
                searchPlaceholder
              }
            }
          `,
          {
            locale: edge.node.locale,
          },
        );

        const dictionary = nodeDataQuery.data.datoCmsDictionary;
        const site = nodeDataQuery.data.datoCmsSite;
        const layout = nodeDataQuery.data.datoCmsLayout;

        if (isIndex && isDefaultLocale) {
          path = '/';
        } else if (isIndex && !isDefaultLocale) {
          path = `${edge.node.locale}/`;
        } else if (options.useTranslations && !isDefaultLocale) {
          path = `${edge.node.locale}/${path}/`;
        }

        if (path !== '/') {
          path = path.replace(/([^:]\/)\/+/g, '$1'); // remove double slashes
        }

        const page = {
          path,
          component: documentTemplate,
          context: {
            node: edge.node,
            dictionary,
            site,
            layout,
          },
        };

        createPage(page);
      }),
    );
  });
};
