import PropTypes from 'prop-types';
import useLocalePath from '../hooks/locale-path';

const LocalePath = ({ path, children }) => {
  const localePath = useLocalePath(path);
  return children(localePath);
};

LocalePath.defaultProps = {
  path: undefined,
};

LocalePath.propTypes = {
  path: PropTypes.string,
  children: PropTypes.func.isRequired,
};

export default LocalePath;
