import React from 'react';
import { boolean, text } from '@storybook/addon-knobs';
import { mdiMagnify } from '@mdi/js';
import { Field, Icon } from '@baretheme/ui';

export default {
  title: 'Components/Field',
};

export const simple = () => (
  <>
    <Field
      mb={1}
      valid={boolean('valid', false)}
      focus={boolean('focus', false)}
      label={text('label', 'E-Mail')}
      error={text('error', undefined)}
      placeholder={text('placeholder', 'I am a placeholder')}
    />
    <Field
      valid={boolean('valid', false)}
      value={text('value', 'John Doe')}
      error={text('error', undefined)}
      placeholder={text('placeholder', 'I am a placeholder')}
    />
  </>
);

export const withAppend = () => (
  <>
    <Field
      mb={1}
      value={text('value', 'John Doe')}
      placeholder={text('placeholder', 'I am a placeholder')}
      append={<Field.Button>Submit</Field.Button>}
    />
    <Field
      value={text('value', 'John Doe')}
      placeholder={text('placeholder', 'I am a placeholder')}
      append={<Field.Button palett="primary" append>Submit</Field.Button>}
    />
  </>
);

export const withPrepend = () => (
  <Field
    focus={boolean('focus', false)}
    value={text('value', 'John Doe')}
    placeholder={text('placeholder', 'I am a placeholder')}
    prepend={<Field.Button><Icon path={mdiMagnify} /></Field.Button>}
  />
);
