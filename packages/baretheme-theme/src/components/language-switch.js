import React from 'react';
import PropTypes from 'prop-types';
import ISO6391 from 'iso-639-1';
import { useIntl } from 'react-intl';
import { navigate } from 'gatsby';
import { globalHistory } from '@reach/router';

import { List } from '@baretheme/ui';

const LanguageSwitch = ({ items, onSwitch }) => (
  <List>
    <List.Body>
      {items.map((item) => (
        <List.Item key={item.id}>
          <List.ItemText active={item.active} onClick={() => onSwitch(item)}>
            {item.title}
          </List.ItemText>
        </List.Item>
      ))}
    </List.Body>
  </List>
);

LanguageSwitch.defaultProps = {
  onSwitch: () => {},
};

LanguageSwitch.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      localePath: PropTypes.string,
      title: PropTypes.string,
      active: PropTypes.bool,
    }),
  ).isRequired,
  onSwitch: PropTypes.func,
};

const AppLanguageSwitch = ({ locales, allSlugLocales, parent }) => {
  const { pathname } = globalHistory.location;
  const intl = useIntl();

  const handleSwitch = (item) => {
    navigate(item.localePath);
    window.localStorage.setItem('language', item.locale);
  };

  const items = locales.map((locale) => {
    const currentLanguage = intl.locale;
    const defaultLanguage = intl.defaultLocale;
    // const defaultLanguageIsActive = currentLanguage === defaultLanguage;
    const languageIsDefault = defaultLanguage === locale;
    const path = pathname.replace(`/${currentLanguage}`, '');
    let localePath = allSlugLocales.find((slugLocale) => slugLocale.locale === locale).value
      || '/';

    if (parent) {
      localePath = `/${parent.slug}/${localePath}`;
    }

    if (languageIsDefault) {
      localePath = `/${localePath}`;
    } else {
      localePath = `/${locale}/${localePath}`;
    }

    localePath = localePath.replace(/\/+/g, '/'); // remove double slashes;

    return {
      title: ISO6391.getNativeName(locale),
      localePath,
      path,
      locale,
      active: locale === intl.locale,
      id: locale,
    };
  });

  return <LanguageSwitch items={items} onSwitch={handleSwitch} />;
};

AppLanguageSwitch.defaultProps = {
  locales: [],
  allSlugLocales: [],
  parent: null,
};

AppLanguageSwitch.propTypes = {
  locales: PropTypes.arrayOf(PropTypes.string),
  allSlugLocales: PropTypes.arrayOf(PropTypes.shape({
    locale: PropTypes.arrayOf(PropTypes.string),
  })),
  parent: PropTypes.shape({
    slug: PropTypes.string,
  }),
};

export default AppLanguageSwitch;
