import PropTypes from 'prop-types';

export default {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  slug: PropTypes.string,
};
