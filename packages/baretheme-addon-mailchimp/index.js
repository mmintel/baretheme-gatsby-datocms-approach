const models = require('./data/models.json');

module.exports = ({ endpoint }) => ({
  plugins: [
    {
      resolve: 'gatsby-plugin-mailchimp',
      options: { endpoint },
    },
  ],
  models,
  register: [
    {
      locations: ['blocks', 'before', 'after'],
      apiKeys: ['mailchimp'],
    },
  ],
  componentQuery: `
      ...on DatoCmsMailchimp {
        id
        title
        description
        successTitle
        successMessage
        errorTitle
        errorMessage
        errorButton
        emailPlaceholder
        emailLabel
        emailInvalidMessage
      }
    `,
});
