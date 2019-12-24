import React from 'react';
import { action } from '@storybook/addon-actions';
import { boolean, select } from '@storybook/addon-knobs';
import Stack from '../components/stack';

export default {
  title: 'Components.Stack',
};

export const single = () => (
  <Stack flush={boolean('flush', false)} align={select('align', ['left', 'center', 'right'], 'left')}>
    <Stack.Item>
      <Stack.ItemText>
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr.
      </Stack.ItemText>
    </Stack.Item>
  </Stack>
);

export const multiple = () => (
  <Stack flush={boolean('flush', false)} align={select('align', ['left', 'center', 'right'], 'left')}>
    <Stack.Item>
      <Stack.ItemText>
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr.
      </Stack.ItemText>
    </Stack.Item>
    <Stack.Item>
      <Stack.ItemText>
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
        eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
        voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
      </Stack.ItemText>
    </Stack.Item>
    <Stack.Item>
      <Stack.ItemText>
        At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd
        gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
      </Stack.ItemText>
    </Stack.Item>
  </Stack>
);

export const withActiveText = () => (
  <Stack flush={boolean('flush', false)} align={select('align', ['left', 'center', 'right'], 'left')}>
    <Stack.Item>
      <Stack.ItemText>
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr.
      </Stack.ItemText>
    </Stack.Item>
    <Stack.Item>
      <Stack.ItemText active>
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
          eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
          voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
      </Stack.ItemText>
    </Stack.Item>
    <Stack.Item>
      <Stack.ItemText>
          At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd
          gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
      </Stack.ItemText>
    </Stack.Item>
  </Stack>
);

export const withLinks = () => (
  <Stack flush={boolean('flush', false)} align={select('align', ['left', 'center', 'right'], 'left')}>
    <Stack.Item>
      <Stack.ItemText as="a" onClick={action('click')}>
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr.
      </Stack.ItemText>
    </Stack.Item>
    <Stack.Item>
      <Stack.ItemText as="a" onClick={action('click')}>
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
        eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
        voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
      </Stack.ItemText>
    </Stack.Item>
    <Stack.Item>
      <Stack.ItemText as="a" onClick={action('click')}>
        At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd
        gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
      </Stack.ItemText>
    </Stack.Item>
  </Stack>
);
