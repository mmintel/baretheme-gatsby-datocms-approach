import React from 'react';
import {
  Section, Headline, Display, Container, Alert,
} from '@baretheme/ui';

const UnregisteredBlock = ({ block }) => {
  const componentName = block.type.replace('DatoCms', '').toLowerCase();
  return (
    <Section>
      <Container>
        <Alert>
          <Headline as="h2" mb={-2}>Unregistered component: <Display italic>{block.type}</Display></Headline>
          <Display>Maybe you forgot to add `@baretheme/gatsby-plugin-baretheme-{componentName}` to `@baretheme/gatsby-theme-baretheme`?</Display>
        </Alert>
      </Container>
    </Section>
  );
};

export default UnregisteredBlock;
