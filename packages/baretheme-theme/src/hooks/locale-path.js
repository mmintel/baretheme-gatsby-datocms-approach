import { useIntl } from 'react-intl';

export default function useLocalePath(to) {
  const intl = useIntl();
  let localePath = to ? `/${to}/` : '/';

  if (intl.locale !== intl.defaultLocale) {
    localePath = `/${intl.locale}/${localePath}/`;
  }

  localePath = localePath.replace(/\/+/g, '/'); // remove double slashes;

  return localePath;
}
