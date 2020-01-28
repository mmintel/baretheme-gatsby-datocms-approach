const models = require('./data/models.json');

module.exports = {
  models,
  register: [
    {
      locations: ['blocks', 'before', 'after'], // Todo delete, must be registered to all, always
      apiKeys: ['text'],
    },
  ],
  contentQuery: `
    ...on DatoCmsText {
      id
      title
      align
      content
    }
  `,
};
