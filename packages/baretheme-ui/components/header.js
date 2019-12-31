import React from 'react';
import styled from '@emotion/styled';
import { Container } from '@baretheme/ui';

const HeaderWrapper = styled.header`
  padding-top: ${(props) => props.theme.spacing(1)};
  padding-bottom: ${(props) => props.theme.spacing(1)};
`;

const HeaderContainer = styled(Container)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Header = ({
  children,
}) => (
  <HeaderWrapper>
    <HeaderContainer>
      {children}
    </HeaderContainer>
  </HeaderWrapper>
);

export default Header;
