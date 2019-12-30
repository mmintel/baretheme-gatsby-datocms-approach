import React from 'react';
import PropTypes from 'prop-types';
import {
  Banner,
  Button,
  Display,
  TextLink,
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
        <TextLink size={-3} mr={-1}>
          <FormattedMessage id="cookieConsentReadMore" defaultMessage="Read more" />
        </TextLink>
        <Button size={-3} palett="primary" onClick={handleAccept}>
          <FormattedMessage id="cookieConsentAccept" defaultMessage="Okay" />
        </Button>
      </>
    )}
    >
      <Display size={-3}>
        <FormattedMessage id="cookieConsentDescription" defaultMessage="This website uses cookies." />
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
