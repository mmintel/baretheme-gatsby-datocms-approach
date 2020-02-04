const config = require('./config');

module.exports = (themeOptions) => {
  const options = { ...config, ...themeOptions };
  const { plugins, ...siteMetadata } = options;
  let addonPlugins = [];

  plugins.forEach((plgn) => {
    let plugin;
    if (typeof plgn === 'object') {
      // eslint-disable-next-line
      plugin = require(plgn.resolve);
      if (typeof plugin === 'function') {
        plugin = plugin(plgn.options, options);
      }
    } else {
      // eslint-disable-next-line
      plugin = require(plgn);
    }

    if (plugin.plugins) {
      addonPlugins = [...addonPlugins, ...plugin.plugins];
    }
  });

  return {
    siteMetadata,
    plugins: [
      ...addonPlugins,
      'gatsby-plugin-emotion',
      'gatsby-plugin-react-helmet',
      'gatsby-plugin-sitemap',
      'gatsby-plugin-sharp',
      {
        resolve: 'gatsby-plugin-compile-es6-packages',
        options: {
          modules: ['@baretheme/ui'],
        },
      },
      {
        resolve: 'gatsby-plugin-svgr',
        options: {
          prettier: true,
          svgo: true,
        },
      },
      {
        resolve: 'gatsby-source-datocms',
        options: {
          apiToken: options.apiKey,
          previewMode: options.previewMode,
          disableLiveReload: false,
        },
      },
      {
        resolve: '@gatsby-contrib/gatsby-plugin-elasticlunr-search',
        options: {
          fields: ['title', 'tags'],
          resolvers: {
            DatoCmsDocument: {
              title: (node) => node.title,
              locale: (node) => node.locale,
              tags: (node, getNode) => node.tags___NODE.map((node) => getNode(node)),
              path: (node) => node.slug,
            },
          },
          filter: (node, getNode) => {
            const parent = getNode(node.treeParent__NODE);
            if (!options.showInactiveDocuments && (!node.active || (parent && !parent.active))) return false;
            if (options.useTranslations) return true;
            return node.locale === options.defaultLocale;
          },
        },
      },
      {
        resolve: 'gatsby-plugin-sentry',
        options: {
          dsn: 'https://8f62efda6aab4dbeaf58700cba33af5a@sentry.io/2234534',
          environment: process.env.NODE_ENV,
          enabled: (() => ['production'].indexOf(process.env.NODE_ENV) !== -1)(),
        },
      },
    ],
  };
};
