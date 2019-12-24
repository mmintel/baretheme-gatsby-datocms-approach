import React from 'react';
import styled from '@emotion/styled';
import { FormattedMessage } from 'react-intl';

import { Footer } from '@baretheme/ui';
import filterNavItems from '../util/filter-nav-items';
import Nav from './nav';

const StyledFooter = styled(Footer)`
  margin-top: auto;
`;

const AppFooter = ({ pageContext }) => {
  const navItems = filterNavItems(pageContext.layout.secondaryNavigation);
  return (
    <StyledFooter
      copyright={(
        <FormattedMessage
          id="copyrightNotice"
          defaultMessage={'Copyright {year}'}
          values={{ year: new Date().getFullYear() }}
        />
      )}
    >
      {navItems.length > 1 && (
        <Nav type="bar" align="center" items={navItems} />
      )}
    </StyledFooter>
  );
};

export default AppFooter;
