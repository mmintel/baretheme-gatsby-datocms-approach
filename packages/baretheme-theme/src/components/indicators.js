import React from 'react';
import PropTypes from 'prop-types';
import { mdiTranslate, mdiMagnify, mdiThemeLightDark } from '@mdi/js';
import { FormattedMessage } from 'react-intl';

import {
  IconBar,
  Icon,
  Tooltip,
} from '@baretheme/ui';
import UIContext from '../context/ui';

const Indicators = ({
  useTranslations, useSearch, useThemeToggle, ...props
}) => {
  const ui = React.useContext(UIContext);

  return (
    <IconBar {...props}>
      {useTranslations && (
        <IconBar.Item>
          <Tooltip
            content={(
              <FormattedMessage
                id="changeLanguage"
                defaultMessage="Change language"
              />
            )}
          >
            <Icon path={mdiTranslate} onClick={ui.toggleLanguageSwitch} />
          </Tooltip>
        </IconBar.Item>
      )}
      {useThemeToggle && (
        <IconBar.Item>
          <Tooltip
            content={
              ui.currentTheme === 'dark' ? (
                <FormattedMessage
                  id="activateLightTheme"
                  defaultMessage="Activate light theme"
                />
              ) : (
                <FormattedMessage
                  id="activateDarkTheme"
                  defaultMessage="Activate dark theme"
                />
              )
            }
          >
            <Icon path={mdiThemeLightDark} onClick={ui.toggleTheme} />
          </Tooltip>
        </IconBar.Item>
      )}
      {useSearch && (
        <IconBar.Item>
          <Tooltip
            content={
              <FormattedMessage id="openSearch" defaultMessage="Open search" />
            }
          >
            <Icon path={mdiMagnify} onClick={ui.toggleSearch} />
          </Tooltip>
        </IconBar.Item>
      )}
    </IconBar>
  );
};

Indicators.defaultProps = {
  useSearch: false,
  useThemeToggle: true,
  useTranslations: false,
};

Indicators.propTypes = {
  useSearch: PropTypes.bool,
  useTranslations: PropTypes.bool,
  useThemeToggle: PropTypes.bool,
};

export default Indicators;
