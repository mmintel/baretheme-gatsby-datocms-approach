require('dotenv').config();

module.exports = {
  plugins: [
    {
      resolve: '@baretheme/gatsby-theme-baretheme',
      options: {
        apiKey: process.env.DATOCMS_API_KEY,
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
