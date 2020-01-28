import React from 'react';
import PropTypes from 'prop-types';
import addToMailchimp from 'gatsby-plugin-mailchimp';
import {
  Section,
  Container,
  Reveal,
} from '@baretheme/ui';
import Newsletter from './newsletter';

const Mailchimp = ({ item }) => {
  const [result, setResult] = React.useState();

  const handleSubmit = async ({ email }) => {
    const response = await addToMailchimp(email);
    setResult(response.result);
  };

  const handleReset = () => {
    setResult(null);
  };

  return (
    <Section>
      <Container size="small">
        <Reveal once>
          <Newsletter
            title={item.title}
            description={item.description}
            result={result}
            success={{ title: item.successTitle, message: item.successMessage }}
            error={{ title: item.errorTitle, message: item.errorMessage, button: item.errorButton }}
            emailField={{
              label: item.emailLabel,
              placeholder: item.emailPlaceholder,
              invalid: item.emailInvalidMessage,
            }}
            onSubmit={handleSubmit}
            onReset={handleReset}
          />
        </Reveal>
      </Container>
    </Section>
  );
};

Mailchimp.propTypes = {
  item: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    successTitle: PropTypes.string,
    successMessage: PropTypes.string,
    errorTitle: PropTypes.string,
    errorMessage: PropTypes.string,
    errorButton: PropTypes.string,
    emailPlaceholder: PropTypes.string,
    emailLabel: PropTypes.string,
    emailInvalidMessage: PropTypes.string,
  }).isRequired,
};

export default Mailchimp;
