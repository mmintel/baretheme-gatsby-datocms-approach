import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { mdiTranslate, mdiMagnify, mdiThemeLightDark } from '@mdi/js';
import { FormattedMessage } from 'react-intl';

import {
  IconBar,
  IconBarItem,
  Icon,
  Tooltip,
} from '@baretheme/ui';
import UIContext from '../context/ui';

const GlobalActions = ({ data, ...props }) => {
  const ui = React.useContext(UIContext);

  return (
    <IconBar {...props}>
      {data.site.siteMetadata.useTranslations && (
        <IconBarItem>
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
        </IconBarItem>
      )}
      {data.site.siteMetadata.useThemeToggle && (
        <IconBarItem>
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
        </IconBarItem>
      )}
      {data.site.siteMetadata.useSearch && (
        <IconBarItem>
          <Tooltip
            content={
              <FormattedMessage id="openSearch" defaultMessage="Open search" />
            }
          >
            <Icon path={mdiMagnify} onClick={ui.toggleSearch} />
          </Tooltip>
        </IconBarItem>
      )}
    </IconBar>
  );
};

export default (props) => {
  const data = useStaticQuery(graphql`
    query GlobalActionsQuery {
      site {
        siteMetadata {
          useTranslations
          useSearch
          useThemeToggle
        }
      }
    }
  `);
  return <GlobalActions data={data} {...props} />;
};
