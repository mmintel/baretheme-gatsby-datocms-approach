import React from 'react';
import styled from '@emotion/styled';
import { FormattedMessage } from 'react-intl';

import { Footer } from '@baretheme/ui';
import Nav from './nav';

const StyledFooter = styled(Footer)`
  margin-top: auto;
`;

const AppFooter = ({ navigation }) => (
  <StyledFooter
    copyright={(
      <FormattedMessage
        id="copyrightNotice"
        defaultMessage={'Copyright {year}'}
        values={{ year: new Date().getFullYear() }}
      />
      )}
  >
    {navigation.length > 1 && (
      <Nav type="bar" align="center" items={navigation} />
    )}
  </StyledFooter>
);

export default AppFooter;
