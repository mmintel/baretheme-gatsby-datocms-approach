import React from 'react';
import { number } from '@storybook/addon-knobs';
import { Section } from '@baretheme/ui';

export default {
  title: 'Components/Section',
};

export const simple = () => (
  <>
    <Section mb={number('mb')} mt={number('mt')}>
      Section 1
    </Section>
    <Section mb={number('mb')} mt={number('mt')}>
      Section 2
    </Section>
  </>
);
