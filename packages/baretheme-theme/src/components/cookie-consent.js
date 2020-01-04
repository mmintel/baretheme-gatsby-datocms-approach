import React from 'react';
import PropTypes from 'prop-types';
import {
  Banner,
  Button,
  Display,
  TextLink,
} from '@baretheme/ui';
import { FormattedMessage } from 'react-intl';
import Link from './link';

let cookieCallback = () => {};

try {
  // eslint-disable-next-line global-require
  cookieCallback = require('../../.cache/addons').default.onAcceptCookies;
} catch (e) {
  cookieCallback = () => {};
}


const CookieConsent = ({ readmoreUrl, onAccept }) => {
  const handleAccept = () => {
    onAccept();
    cookieCallback();
  };

  return (
    <Banner actions={(
      <>
        { readmoreUrl && (
          <TextLink size={-3} mr={-1}>
            <Link to={readmoreUrl}>
              <FormattedMessage id="cookieConsentReadMore" defaultMessage="Read more" />
            </Link>
          </TextLink>
        )}
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
  readmoreUrl: undefined,
};

CookieConsent.propTypes = {
  readmoreUrl: PropTypes.string,
  onAccept: PropTypes.func,
};

export default CookieConsent;
