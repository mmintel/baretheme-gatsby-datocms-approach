import React from 'react';
import styled from '@emotion/styled';
import Nav from './nav';
import GlobalActions from './global-actions';

const StyledGlobalActions = styled(GlobalActions)`
  margin: ${(props) => props.theme.spacing(1)};
`;

const MobileNavigation = ({ navigation, ...props }) => (
  <div>
    <StyledGlobalActions />
    <Nav type="stack" items={navigation} {...props} />
  </div>
);

export default MobileNavigation;
