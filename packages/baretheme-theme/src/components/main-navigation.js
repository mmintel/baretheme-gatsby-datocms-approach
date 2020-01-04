import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import Nav from './nav';

const StyledMainNavigation = styled.div`
  min-width: 280px;
`;

const MainNavigation = ({ navigation, header, ...props }) => (
  <StyledMainNavigation>
    { header }
    <Nav type="stack" items={navigation} {...props} />
  </StyledMainNavigation>
);

MainNavigation.defaultProps = {
  navigation: [],
  header: undefined,
};

MainNavigation.propTypes = {
  header: PropTypes.node,
  navigation: PropTypes.arrayOf(PropTypes.object),
};

export default MainNavigation;
