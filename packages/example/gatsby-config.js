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
          {
            resolve: '@baretheme/addon-mailchimp',
            options: {
              endpoint: 'https://baretheme.us3.list-manage.com/subscribe/post?u=ae9407626dc29296e29bb6819&amp;id=c325a0b8ca',
            },
          },
          {
            resolve: '@baretheme/addon-google-analytics',
            options: {
              trackingId: 'UA-111111111-1',
            },
          },
        ],
      },
    },
  ],
};
