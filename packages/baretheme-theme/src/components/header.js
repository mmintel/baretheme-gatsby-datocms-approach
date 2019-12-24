import React from 'react';
import { Header, SocialAccounts, Logo } from '@baretheme/ui';
import UIContext from '../context/ui';
import filterNavItems from '../util/filter-nav-items';

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

const AppHeader = ({ pageContext }) => {
  const ui = React.useContext(UIContext);
  const navItems = filterNavItems(pageContext.layout.mainNavigation);

  return (
    <Header
      logo={
        ui.currentTheme === 'light' ? (
          <Logo logo={LightThemeLogo} />
        ) : (
          <Logo logo={DarkThemeLogo} />
        )
      }
      accounts={<SocialAccounts items={pageContext.layout.socialAccounts} />}
      nav={
        navItems.length > 1 && (
          <MainNavigation
            isOpen={ui.navigation.isOpen}
            onToggle={ui.toggleNavigation}
            compact={ui.media.isLessThan('medium')}
            items={navItems}
          />
        )
      }
      actions={ui.media.isGreaterThan('medium') && <GlobalActions />}
    />
  );
};

export default AppHeader;
