import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { FormattedMessage } from 'react-intl';

import { Footer, Display } from '@baretheme/ui';
import Nav from './nav';

const StyledFooter = styled(Footer)`
  margin-top: auto;
`;

const AppFooter = ({ navigation }) => (
  <StyledFooter>
    <Display align="center" as="div" mb={1} size={-1}>
      <FormattedMessage
        id="copyrightNotice"
        defaultMessage={'Copyright {year}'}
        values={{ year: new Date().getFullYear() }}
      />
    </Display>
    <Nav type="bar" size={-1} align="center" items={navigation} />
  </StyledFooter>
);

AppFooter.defaultProps = {
  navigation: [],
};

AppFooter.propTypes = {
  navigation: PropTypes.arrayOf(PropTypes.object),
};

export default AppFooter;
