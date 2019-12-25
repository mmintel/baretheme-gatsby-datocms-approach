module.exports = {
  plugins: [
    {
      resolve: '@baretheme/gatsby-theme-baretheme',
      options: {
        apiKey: '7a48ce3a32ee399b44045ae0fa8487',
        useSearch: false,
        useTranslations: true,
        plugins: [
          '@baretheme/gatsby-plugin-baretheme-text',
        ],
      },
    },
  ],
};
