module.exports = {
  plugins: [
    {
      resolve: '@baretheme/gatsby-theme-baretheme',
      options: {
        apiKey: 'cec37e1d28219d9063490b23b49807',
        useSearch: true,
        useCookies: true,
        useTranslations: true,
        plugins: [
          '@baretheme/gatsby-plugin-baretheme-text',
        ],
      },
    },
  ],
};
