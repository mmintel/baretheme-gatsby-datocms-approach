import React from 'react';
import { select, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import Bar from '../components/bar';

export default {
  title: 'Components/Bar',
};

export const single = () => (
  <Bar flush={boolean('flush', false)} align={select('align', ['left', 'center', 'right'], 'left')}>
    <Bar.Item>
      <Bar.ItemText>
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr.
      </Bar.ItemText>
    </Bar.Item>
  </Bar>
);

export const multiple = () => (
  <Bar flush={boolean('flush', false)} align={select('align', ['left', 'center', 'right'], 'left')}>
    <Bar.Item>
      <Bar.ItemText>
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr.
      </Bar.ItemText>
    </Bar.Item>
    <Bar.Item>
      <Bar.ItemText>
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
        eirmod tempor invidunt.
      </Bar.ItemText>
    </Bar.Item>
    <Bar.Item>
      <Bar.ItemText>
        At vero eos et accusam et justo duo dolores et ea rebum.
      </Bar.ItemText>
    </Bar.Item>
  </Bar>
);

export const withLinks = () => (
  <Bar flush={boolean('flush', false)} align={select('align', ['left', 'center', 'right'], 'left')}>
    <Bar.Item>
      <Bar.ItemText as="a" onClick={action('click')}>
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr.
      </Bar.ItemText>
    </Bar.Item>
    <Bar.Item>
      <Bar.ItemText as="a" onClick={action('click')}>
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
        eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
        voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
      </Bar.ItemText>
    </Bar.Item>
    <Bar.Item>
      <Bar.ItemText as="a" onClick={action('click')}>
        At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd
        gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
      </Bar.ItemText>
    </Bar.Item>
  </Bar>
);
