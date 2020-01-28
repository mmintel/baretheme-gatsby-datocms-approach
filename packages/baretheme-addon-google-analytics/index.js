module.exports = ({ trackingId }) => ({
  plugins: [
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: { trackingId },
    },
  ],
});
