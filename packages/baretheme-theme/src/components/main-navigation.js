import React from 'react';
import styled from '@emotion/styled';
import Nav from './nav';
import Indicators from './indicators';

const StyledMainNavigation = styled.div`
  min-width: 280px;
`;

const StyledIndicators = styled(Indicators)`
  margin: 2rem ${(props) => props.theme.spacing(1)} 1rem;
`;

const MainNavigation = ({ navigation, ...props }) => (
  <StyledMainNavigation>
    <StyledIndicators />
    <Nav type="stack" items={navigation} {...props} />
  </StyledMainNavigation>
);

export default MainNavigation;
