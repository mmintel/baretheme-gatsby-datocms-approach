const models = require('./data/models.json');

module.exports = {
  models,
  componentQuery: `
    ...on DatoCmsGrid {
      id
      text
      items {
        id
        title
        image {
          url
        }
      }
    }
  `,
};
