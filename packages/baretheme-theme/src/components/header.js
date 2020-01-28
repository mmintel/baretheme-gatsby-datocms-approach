import React from 'react';
import PropTypes from 'prop-types';
import { Header, Burger } from '@baretheme/ui';
import UIContext from '../context/ui';
import Brand from './brand';

const AppHeader = ({ socialAccounts }) => {
  const ui = React.useContext(UIContext);

  return (
    <Header>
      <Brand socialAccounts={socialAccounts} />
      <Burger
        isOpen={ui.navigation.isOpen}
        onToggle={ui.toggleNavigation}
      />
    </Header>
  );
};

AppHeader.defaultProps = {
  socialAccounts: [],
};

AppHeader.propTypes = {
  socialAccounts: PropTypes.arrayOf(PropTypes.object),
};

export default AppHeader;
