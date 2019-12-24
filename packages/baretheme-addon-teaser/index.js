const models = require('./data/models.json');

module.exports = {
  models,
  register: [
    {
      locations: ['blocks', 'before', 'after'],
      apiKeys: ['teaser'],
    },
  ],
  query: `
    ...on DatoCmsTeaser {
      id
      title
      links {
        id
      }
    }
  `,
};
