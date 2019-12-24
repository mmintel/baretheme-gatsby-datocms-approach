import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import styled from '@emotion/styled';
import Nav from './nav';
import GlobalActions from './global-actions';

const StyledGlobalActions = styled(GlobalActions)`
  margin-bottom: ${(props) => props.theme.spacing(1)};
`;

const MobileNavigation = styled.div`
  padding: ${(props) => props.theme.spacing(1)};
`;

export default ({ ...props }) => {
  const data = useStaticQuery(graphql`
    query MobileNavigationQuery {
      datoCmsLayout {
        mainNavigation {
          id
          slug
          title
        }
        socialAccounts {
          title
          url
          id
        }
      }
    }
  `);
  return (
    <MobileNavigation>
      <StyledGlobalActions />
      <Nav type="stack" items={data.datoCmsLayout.mainNavigation} {...props} />
    </MobileNavigation>
  );
};
