import React from 'react';
import PropTypes from 'prop-types';
import {
  Section, Headline, Display, Container, Alert,
} from '@baretheme/ui';

const UnregisteredContent = ({ item }) => {
  const componentName = item.type.replace('DatoCms', '').toLowerCase();
  return (
    <Section>
      <Container>
        <Alert>
          <Headline as="h2" mb={-2}>Unregistered component: <Display italic>{item.type}</Display></Headline>
          <Display>Maybe you forgot to add `@baretheme/gatsby-plugin-baretheme-{componentName}` to `@baretheme/gatsby-theme-baretheme`?</Display>
        </Alert>
      </Container>
    </Section>
  );
};

UnregisteredContent.propTypes = {
  item: PropTypes.shape({
    type: PropTypes.string,
  }).isRequired,
};

export default UnregisteredContent;
