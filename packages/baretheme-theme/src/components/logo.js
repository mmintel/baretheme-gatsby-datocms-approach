import React from 'react';
import { Logo as BaseLogo } from '@baretheme/ui';
import UIContext from '../context/ui';

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

const Logo = () => {
  const ui = React.useContext(UIContext);
  return ui.currentTheme === 'light' ? (
    <BaseLogo logo={LightThemeLogo} />
  ) : (
    <BaseLogo logo={DarkThemeLogo} />
  );
};

export default Logo;
