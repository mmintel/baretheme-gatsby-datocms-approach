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
    ...on DatoCmsFigure {
      id
      title
      caption
      orientation
      reverse
      light {
        title
        fluid(maxWidth: 1200, imgixParams: { fm: "jpg", auto: "compress" }) {
          base64
          aspectRatio
          src
          srcSet
          sizes
        }
      }
      dark {
        title
        fluid(maxWidth: 1200, imgixParams: { fm: "jpg", auto: "compress" }) {
          base64
          aspectRatio
          src
          srcSet
          sizes
        }
      }
    }
  `,
};
