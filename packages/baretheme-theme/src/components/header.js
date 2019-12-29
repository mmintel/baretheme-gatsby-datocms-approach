import React from 'react';
import { Header, SocialAccounts, Logo } from '@baretheme/ui';
import UIContext from '../context/ui';

import MainNavigation from './main-navigation';
import GlobalActions from './global-actions';

let LightThemeLogo;
let DarkThemeLogo;

try {
  // eslint-disable-next-line
  LightThemeLogo = require("../../.cache/assets/light-theme-logo");
} catch (e) {
  LightThemeLogo = false;
}

try {
  // eslint-disable-next-line
  DarkThemeLogo = require("../../.cache/assets/dark-theme-logo");
} catch (e) {
  DarkThemeLogo = false;
}

const AppHeader = ({ navigation, socialAccounts }) => {
  const ui = React.useContext(UIContext);

  return (
    <Header
      logo={
        ui.currentTheme === 'light' ? (
          <Logo logo={LightThemeLogo} />
        ) : (
          <Logo logo={DarkThemeLogo} />
        )
      }
      accounts={<SocialAccounts items={socialAccounts} />}
      nav={(
        <MainNavigation
          isOpen={ui.navigation.isOpen}
          onToggle={ui.toggleNavigation}
          compact={ui.media.isLessThan('medium')}
          items={navigation}
        />
      )}
      actions={ui.media.isGreaterThan('medium') && <GlobalActions />}
    />
  );
};

export default AppHeader;
