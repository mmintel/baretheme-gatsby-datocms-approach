const models = require('./data/models.json');

module.exports = {
  models,
  register: [
    {
      locations: ['blocks', 'before', 'after'],
      apiKeys: ['text'],
    },
  ],
  query: `
    ...on DatoCmsText {
      id
      title
      hideHeading
      headingLevel
      headingSize
      align
      content
    }
  `,
};
