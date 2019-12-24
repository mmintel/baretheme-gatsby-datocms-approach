import { useIntl } from 'react-intl';
import { globalHistory } from '@reach/router';

export default function useActiveLocale(path) {
  const intl = useIntl();

  const currentLanguage = intl.locale;
  const defaultLanguage = intl.defaultLocale;
  const currentPath = globalHistory.location.pathname;

  let localePath = currentPath;
  let active = false;

  if (defaultLanguage !== currentLanguage) {
    localePath = localePath.replace(`${currentLanguage}/`, '');
  }

  if ((path === null && localePath === '/') || localePath === path) {
    active = true;
  }

  return {
    localePath: path ? `/${path}` : '/',
    active,
  };
}
