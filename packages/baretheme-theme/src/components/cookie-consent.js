import React from 'react';
import PropTypes from 'prop-types';
import {
  Banner,
  Button,
  Display,
} from '@baretheme/ui';
import { FormattedMessage } from 'react-intl';

let cookieCallback = () => {};

try {
  // eslint-disable-next-line global-require
  cookieCallback = require('../../.cache/addons').default.onAcceptCookies;
} catch (e) {
  cookieCallback = () => {};
}


const CookieConsent = ({ onAccept }) => {
  const handleAccept = () => {
    onAccept();
    cookieCallback();
  };

  return (
    <Banner actions={(
      <>
        <Button size={-2} mr={-1}>Read more</Button>
        <Button size={-2} palett="primary" onClick={handleAccept}>Ok</Button>
      </>
    )}
    >
      <Display size={-1}>
        <FormattedMessage id="cookieConsent" defaultMessage="This website uses cookies." />
      </Display>
    </Banner>
  );
};

CookieConsent.defaultProps = {
  onAccept: () => {},
};

CookieConsent.propTypes = {
  onAccept: PropTypes.func,
};

export default CookieConsent;
