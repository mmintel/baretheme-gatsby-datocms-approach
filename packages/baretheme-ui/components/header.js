import React from 'react';
import styled from '@emotion/styled';
import { Container } from '@baretheme/ui';
import { css } from '@emotion/core';

const HeaderWrapper = styled.header`
  padding-top: ${(props) => props.theme.spacing(1)};
  padding-bottom: ${(props) => props.theme.spacing(1)};
`;

const HeaderContainer = styled(Container)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const HeaderSite = styled.div`
  display: flex;
  align-items: center;
`;

const HeaderAccounts = styled.div`
  border-left: 1px solid ${(props) => props.theme.color.faded};
  padding-left: ${(props) => props.theme.spacing(1)};
  margin-left: ${(props) => props.theme.spacing(1)};
`;

const HeaderNavigation = styled.div`
  display: flex;
  align-items: center;
`;

const HeaderActions = styled.div`
  ${(props) => props.hasNav && css`
    border-left: 1px solid ${props.theme.color.faded};
    padding-left: ${props.theme.spacing(1)};
  `}
`;

const Header = ({
  logo, accounts, nav, actions, children,
}) => (
  <HeaderWrapper>
    <HeaderContainer>
      {(logo || accounts) && (
        <HeaderSite>
          {logo}
          {accounts && <HeaderAccounts>{accounts}</HeaderAccounts>}
        </HeaderSite>
      )}
      {children}
      {(nav || actions) && (
        <HeaderNavigation>
          {nav}
          {actions && <HeaderActions hasNav={!!nav}>{actions}</HeaderActions>}
        </HeaderNavigation>
      )}
    </HeaderContainer>
  </HeaderWrapper>
);

export default Header;
